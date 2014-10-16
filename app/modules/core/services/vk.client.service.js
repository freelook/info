'use strict';
angular
    .module('core')
    .factory('VK',
    function ($window, $location, $http, $rootScope, Authentication, LocalStorage, toaster) {

        // TODO use constant!

        var VK = {};

        VK.init = function () {
            if ($window.VK && $window.VK.Widgets) {
                $window.VK.init({apiId: 3520312, onlyWidgets: true});
                $window.VK.Widgets.Post('vk_post', -50609732, 124, 'hWNjwJubCJ69XFWPH_s0GcVXSnI');
            }
            if (Authentication.isVK()) {
                $rootScope.user.vk = VK.user();
            }
        };

        VK.getSocialInfo = function (callBack) {
            if (!callBack) {
                callBack = function (data) {
                    if (data) {
                        var value = angular.extend(LocalStorage.getVK(), data);
                        Authentication.setVKUser(value);
                    }
                };
            }
            var vkr = 'http://api.vk.com/method/users.get?user_ids=' + Authentication.user.vk.user_id + '&fields=photo_50&callback=JSON_CALLBACK';
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

        VK.oauth = function () {
            var appId = '4588210';
            var authURL = 'https://oauth.vk.com/authorize?client_id=' + appId + '&scope=wall,email&redirect_uri='+ $window.location.origin + '/oauth/vk' + '&display=popup&v=5.25&response_type=token';
            $window.location = authURL;
        };



        return VK;
    }
);
