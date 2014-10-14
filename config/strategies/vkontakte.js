'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
    url = require('url'),
    VKStrategy = require('passport-vkontakte').Strategy,
    config = require('../config'),
    users = require('../../server/controllers/users');

//    VKStrategy.prototype.userProfile  = function(accessToken, done) {
//        var profile = {};
//        profile._json = {accessToken: accessToken};
//        done(null, profile);
//    };


module.exports = function() {
    // Use vkontakte strategy
    passport.use(new VKStrategy({
            clientID: config.vkontakte.clientID,
            clientSecret: config.vkontakte.clientSecret,
            callbackURL: config.vkontakte.callbackURL,
            passReqToCallback: true
        },
        function(req, accessToken, refreshToken, profile, done) {
            // Set the provider data and include tokens
            var providerData = profile._json;
            providerData.accessToken = accessToken;
            providerData.refreshToken = refreshToken;

            // Create the user OAuth profile
            var providerUserProfile = {
                email: profile.emails && profile.emails[0].value,
                username: profile.username,
                provider: 'vkontakte',
                providerIdentifierField: 'id',
                providerData: providerData
            };

            // Save the user OAuth profile
            users.saveOAuthUserProfile(req, providerUserProfile, done);
        }
    ));
};