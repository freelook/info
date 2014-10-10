'use strict';
angular
    .module('core')
    .factory('VK',
    function ($window, $location, $http, $rootScope, Authentication, LocalStorage) {
        var VK = {};
        VK.init = function () {
            if ($window.VK && $window.VK.Widgets) {
                var loc = $location.host() + '/' + Authentication.date;
                console.dir(loc);
                $window.VK.init({apiId: 3520312, onlyWidgets: true});
                if (!Authentication.user && !Authentication.user.vk) {
                    $window.VK.Widgets.Like('vk_signin', {type: 'vertical', verb: 1, height: 24, pageUrl: loc});
                }
                $window.VK.Widgets.Post('vk_post', -50609732, 124, 'hWNjwJubCJ69XFWPH_s0GcVXSnI');
                if (VK.user()) {
                    $rootScope.vk.user = VK.user();
                } else {
                    VK.getSocialInfo();
                }
            }

        };

        VK.subscribe = function (event, callback) {
            if ($window.VK && $window.VK.Observer && $window.VK.Observer.subscribe) {
                $window.VK.Observer.subscribe(event, callback);
            }
        };
        VK.onLiked = function (callback) {
            VK.subscribe('widgets.like.liked', callback);
        };
        VK.onUnLiked = function (callback) {
            VK.subscribe('widgets.like.unliked', callback);
        };
        VK.signIn = function () {
            $http.post('/auth/vk').then(function (response) {
                if (response.data.success && response.data.user) {
                    Authentication.setUser(response.data.user);
                    VK.getSocialInfo();
                } else {
                    console.log('error');
                }
            });
        };
        VK.getSocialInfo = function (callBack) {
            if (Authentication.isVK()) {
                if (!callBack) {
                    callBack = function (data) {
                        if (data) {
                            LocalStorage.setVK(data);
                            $rootScope.vk.user = data;
                        }
                    };
                }
                var vkr = 'http://api.vk.com/method/users.get?user_ids=' + Authentication.user.vk.uid + '&fields=photo_50&callback=JSON_CALLBACK';
                $http.jsonp(vkr).success(function (data) {
                    if (data) {
                        callBack(data.response[0]);
                    }
                });
            }
        };
        VK.user = function () {
            return LocalStorage.getVK() || VK.getSocialInfo();
        };

        VK.search = function (data, callBack) {
            var vkr = 'http://api.vk.com/method/newsfeed.search?q=' + data + '&count=10&extended=1&v=5.25&callback=JSON_CALLBACK';
            $http.jsonp(vkr).success(function (data) {
                if (data && data.response) {
                    callBack(data.response);
                }
            });
        };


        return VK;
    }
);
