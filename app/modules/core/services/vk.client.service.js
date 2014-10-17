'use strict';
angular
    .module('core')
    .factory('VK',
    function ($window, $location, $http, $rootScope, Auth, LocalStorage, toaster, VK_APP_ID, VKONTAKTE) {


        var VK = {};

        VK.init = function () {
        };

        VK.getSocialInfo = function (callBack) {
            if (!callBack) {
                callBack = function (data) {
                    if (data) {
                        var value = angular.extend(LocalStorage.getUser(VKONTAKTE), data);
                        Auth.setUser(VKONTAKTE, value);
                    }
                };
            }
            var vkr = 'http://api.vk.com/method/users.get?user_ids=' + Auth.user.vk.user_id + '&fields=photo_50&callback=JSON_CALLBACK';
            $http.jsonp(vkr).success(function (data) {
                if (data) {
                    callBack(data.response[0]);
                }
            });

        };

        VK.user = function () {
            return LocalStorage.getVK();
        };


        VK.search = function (data, callBack) {
            var vkr = 'http://api.vk.com/method/newsfeed.search?q=' + data + '&count=10&extended=1&v=5.25&callback=JSON_CALLBACK';
            $http.jsonp(vkr).success(function (data) {
                if (data && data.response) {
                    callBack(data.response);
                }
            });
        };

        VK.getAuthURL = function () {
            return 'https://oauth.vk.com/authorize?client_id=' + VK_APP_ID + '&scope=wall,email&redirect_uri=' + $window.location.origin + '/oauth/vk' + '&display=popup&v=5.25&response_type=token';
        };

        return VK;
    });
