'use strict';

// Authentication service for user variables
angular
    .module('users')
    .factory('Authentication',
    function ($window, LocalStorage) {
        var Authentication = {
            user: $window.user,
            date: $window.date || (new Date()).getTime(),
            setUser: function(user) {
                $window.user = user;
                Authentication.user = user;
                //LocalStorage.setUser(user);

            },
            isVK: function() {
                return Authentication.user && Authentication.user.vkontakte && Authentication.user.vkontakte.id;
            }
        };

        return Authentication;
    }
);