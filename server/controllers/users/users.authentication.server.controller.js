'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    errorHandler = require('../errors'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User');

/**
 * Signup
 */
exports.signup = function (req, res) {
    // For security measurement we remove the roles from the req.body object
    delete req.body.roles;

    // Init Variables
    var user = new User(req.body);
    var message = null;

    // Add missing user fields
    user.provider = 'local';
    if (user.vk && user.vk.first_name && user.vk.last_name) {
        user.username = user.vk.first_name + ' ' + user.vk.last_name;
    }

    // Then save the user
    user.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err),
                success: false
            });
        } else {
            // Remove sensitive data before login
            user.password = undefined;
            user.salt = undefined;

            req.login(user, function (err) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.send({
                        user: user,
                        success: true
                    });
                }
            });
        }
    });
};

/**
 * Signin after passport authentication
 */
exports.signin = function (req, res, next, user) {
    passport.authenticate('local', function (err, none, info) {
        if (err || !user) {
            res.status(400).send(info);
        } else {
            req.login(user, function (err) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.send({
                        user: user,
                        success: true
                    });
                }
            });
        }
    })(req, res, next);
};

/**
 * Signout
 */
exports.signout = function (req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * OAuth callback
 */
exports.oauthCallback = function (strategy) {
    return function (req, res, next) {
        passport.authenticate(strategy, function (err, user, redirectURL) {
            if (err || !user) {
                return res.redirect('/#!/signin');
            }
            req.login(user, function (err) {
                if (err) {
                    return res.redirect('/#!/signin');
                }

                return res.redirect(redirectURL || '/');
            });
        })(req, res, next);
    };
};

/**
 * Helper function to save or update a OAuth user profile
 */
exports.saveOAuthUserProfile = function (req, providerUserProfile, done) {
    if (!req.user) {
        // Define a search query fields
        var searchMainProviderIdentifierField = 'providerData.' + providerUserProfile.providerIdentifierField;
        var searchAdditionalProviderIdentifierField = 'additionalProvidersData.' + providerUserProfile.provider + '.' + providerUserProfile.providerIdentifierField;

        // Define main provider search query
        var mainProviderSearchQuery = {};
        mainProviderSearchQuery.provider = providerUserProfile.provider;
        mainProviderSearchQuery[searchMainProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentifierField];

        // Define additional provider search query
        var additionalProviderSearchQuery = {};
        additionalProviderSearchQuery[searchAdditionalProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentifierField];

        // Define a search query to find existing user with current provider profile
        var searchQuery = {
            $or: [mainProviderSearchQuery, additionalProviderSearchQuery]
        };

        User.findOne(searchQuery, function (err, user) {
            if (err) {
                return done(err);
            } else {
                if (!user) {
                    var possibleUsername = providerUserProfile.username || ((providerUserProfile.email) ? providerUserProfile.email.split('@')[0] : '');

                    User.findUniqueUsername(possibleUsername, null, function (availableUsername) {
                        user = new User({
                            firstName: providerUserProfile.firstName,
                            lastName: providerUserProfile.lastName,
                            username: availableUsername,
                            displayName: providerUserProfile.displayName,
                            email: providerUserProfile.email,
                            provider: providerUserProfile.provider,
                            providerData: providerUserProfile.providerData
                        });

                        // And save the user
                        user.save(function (err) {
                            return done(err, user);
                        });
                    });
                } else {
                    return done(err, user);
                }
            }
        });
    } else {
        // User is already logged in, join the provider data to the existing user
        var user = req.user;

        // Check if user exists, is not signed in using this provider, and doesn't have that provider data already configured
        if (user.provider !== providerUserProfile.provider && (!user.additionalProvidersData || !user.additionalProvidersData[providerUserProfile.provider])) {
            // Add the provider data to the additional provider data field
            if (!user.additionalProvidersData) user.additionalProvidersData = {};
            user.additionalProvidersData[providerUserProfile.provider] = providerUserProfile.providerData;

            // Then tell mongoose that we've updated the additionalProvidersData field
            user.markModified('additionalProvidersData');

            // And save the user
            user.save(function (err) {
                return done(err, user, '/#!/settings/accounts');
            });
        } else {
            return done(new Error('User is already connected using this provider'), user);
        }
    }
};

/**
 * Remove OAuth provider
 */
exports.removeOAuthProvider = function (req, res, next) {
    var user = req.user;
    var provider = req.param('provider');

    if (user && provider) {
        // Delete the additional provider
        if (user.additionalProvidersData[provider]) {
            delete user.additionalProvidersData[provider];

            // Then tell mongoose that we've updated the additionalProvidersData field
            user.markModified('additionalProvidersData');
        }

        user.save(function (err) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err),
                    success: false
                });
            } else {
                req.login(user, function (err) {
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        res.jsonp(user);
                    }
                });
            }
        });
    }
};

exports.vk = function (req, res, next) {
    var http = require('http'),
        vk_time = req.cookies.vk_time,
        vk_request = 'http://api.vk.com/method/likes.getList?type=sitepage&owner_id=3520312&extended=1&page_url=freelookinfo.herokuapp.com/';
    if (vk_time) {
        http.get(vk_request + vk_time,
            function (VKRes) {
                var data;
                VKRes.setEncoding('utf8');
                res.setHeader('Content-Type', 'text/plain;charset=utf-8');
                VKRes.on('data', function (d) {
                    if (data) {
                        data += d;
                    } else {
                        data = d;
                    }
                });
                VKRes.on('end', function () {
                    try {
                        var VKuser,
                            VKresponse = JSON.parse(data);
                        if (VKresponse && VKresponse.response) {
                            var response = VKresponse.response;
                            if (response.items.length === 1) {
                                VKuser = VKresponse.response.items[0];

                                req.body.vk = VKuser;
                                req.body.free = 'look';

                                User.findOne({'vk.uid': VKuser.uid}, function (err, user) {
                                    if (!err) {
                                        if (user) {
                                            exports.signin(req, res, next, user);
                                        } else {
                                            exports.signup(req, res, next);
                                        }
                                    }
                                });
                            } else {
                                res.send({
                                    message: errorHandler.getErrorMessage(),
                                    success: false
                                });
                            }
                        } else {
                            res.send({
                                message: errorHandler.getErrorMessage(),
                                success: false
                            });
                        }
                    } catch (err) {
                        res.send({
                            message: errorHandler.getErrorMessage(err),
                            success: false
                        });
                        console.log(err);
                    }
                });
            }).on('error', function (err) {
                res.send({
                    message: errorHandler.getErrorMessage(err),
                    success: false
                });
                console.log('Got error: ' + err.message);
            });
    }
};
