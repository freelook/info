'use strict';

// Authentication service for user variables
angular
    .module('users')
    .factory('Auth',
    function ($window, LocalStorage, VKONTAKTE, FACEBOOK) {
        var Auth = {};

        Auth.user = {
            vk: LocalStorage.getUser(VKONTAKTE) || {},
            facebook: LocalStorage.getUser(FACEBOOK) || {}
        };
        Auth.setUser = function (socialName, user) {
            Auth.user[socialName] = user;
            LocalStorage.setUser(socialName, user);
        };
        Auth.clearUser = function (socialName) {
            LocalStorage.setVK(socialName, {});
            Auth.user[socialName] = {};
        };
        Auth.isReadyFor = function (socialName, indexKey) {
            return Auth.user && Auth.user[socialName] && !!Auth.user[socialName][indexKey || 'id'];
        };

        Auth.oauth = function (authURL) {
            $window.location = authURL;
        };

        return Auth;
    }
);