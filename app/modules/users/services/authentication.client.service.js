'use strict';

// Authentication service for user variables
angular
    .module('users')
    .factory('Authentication',
    function ($window, LocalStorage,$injector) {
        var Authentication = {
            user: {
                vk: LocalStorage.getVK() || {},
                fb: LocalStorage.getFB() || {}
            },
            setVKUser: function (user) {
                Authentication.user.vk = user;
                LocalStorage.setVK(user);
            },
            clearVKUser: function () {
                LocalStorage.setVK({});
                Authentication.user.vk = {};
            },
            isVK: function () {
                return Authentication.user && Authentication.user.vk && Authentication.user.vk.user_id;
            },
            setFBUser: function (user) {
                Authentication.user.fb = user;
                LocalStorage.setFB(user);
            },
            isFB: function () {
                return Authentication.user && Authentication.user.fb && Authentication.user.fb.id;
            },
            clearFBUser: function () {
                LocalStorage.setFB({});
                Authentication.user.fb = {};
            },
            oauth: function(socialName){
                switch (socialName) {
                    case 'vk':
                        $window.location=$injector.get('VK').getAuthURL();
                        break;
                    case 'fb':
                        $window.location=$injector.get('FB').getAuthURL();
                        break;
                    default:
                        break;
            }

        }
        }
        return Authentication;
    }
);