'use strict';

// Authentication service for user variables
angular
    .module('users')
    .factory('Authentication',
    function ($window, LocalStorage) {
        var Authentication = {
            user:  {
                vk : LocalStorage.getVK(),
                fb: LocalStorage.getFB()
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
            },
            setFBUser:function(user){
                Authentication.user.fb=user;
                LocalStorage.setFB(user);
            },
            isFB: function(){
                return Authentication.user && Authentication.user.fb;
            },
            clearFBUser: function(){
                LocalStorage.setFB('');
                Authentication.user.fb = '';
            }

        };

        return Authentication;
    }
);