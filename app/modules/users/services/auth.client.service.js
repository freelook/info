'use strict';

// Authentication service for user variables
angular
    .module('users')
    .factory('Auth',
    function ($window, LocalStorage, Constants) {
        var Auth = {};

        Auth.getUser = function(socialName) {
            return LocalStorage.getUser(Constants[socialName].name) || {};
        };
        Auth.setUser = function (socialName, user) {
            Auth.user[socialName] = user;
            LocalStorage.setUser(socialName, user);
        };
        Auth.clearUser = function (socialName) {
            LocalStorage.setUser(socialName, {});
            Auth.user[socialName] = {};
        };
        Auth.is = function (socialName) {
            return !!Auth.getUID(socialName);
        };

        Auth.oauth = function (authURL) {
            $window.location = authURL;
        };

        Auth.getUID = function(socialName) {
            return Auth.getUser(socialName)[Constants[socialName].uid];
        };

        Auth.user = {
            vk:  Auth.getUser('vk'),
            facebook: Auth.getUser('facebook')
        };

        return Auth;
    }
);