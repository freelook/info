'use strict';

// Authentication service for user variables
angular
    .module('users')
    .factory('Authentication',
    function ($window, LocalStorage) {
        var Authentication = {
            user:  {
                vk : LocalStorage.getVK()
            },
            setVKUser: function(user) {
                //$window.user.vk = user;
                Authentication.user.vk = user;
                LocalStorage.setVK(user);
            },
            clearVKUser: function() {
                LocalStorage.setVK('');
                Authentication.user.vk = '';
            },
            isVK: function() {
                return Authentication.user && Authentication.user.vk && Authentication.user.vk.user_id;
            }
        };

        return Authentication;
    }
);