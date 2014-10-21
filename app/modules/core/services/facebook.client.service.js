'use strict';
angular
    .module('core')
    .factory('FB', function ($window, $http, LocalStorage, Auth, FACEBOOK) {
        var FB = {};

        FB.getAvatar = function () {
            var fbr = 'https://graph.facebook.com/me/picture?&access_token=' + FB.getToken() + '&callback=JSON_CALLBACK';
            $http.jsonp(fbr).success(function (r) {
                if (r && r.data) {
                    FB.setSocialInfo(r.data);
                }
            });
        };

        FB.setSocialInfo = function (data) {
            if (data) {
                var value = angular.extend(LocalStorage.getUser(FACEBOOK.name), data);
                Auth.setUser(FACEBOOK.name, value);
            }
        };

        FB.getSocialInfo = function (callBack) {
            if (!callBack) {
                callBack = FB.setSocialInfo;
            }
            var fbr = 'https://graph.facebook.com/me?&access_token=' + FB.getToken() + '&callback=JSON_CALLBACK';
            $http.jsonp(fbr).success(function (data) {
                if (data) {
                    callBack(data);
                    FB.getAvatar();
                }
            });
        };

        FB.getToken = function () {
            return Auth.getUser(FACEBOOK.name).access_token;
        };

        FB.getID = function () {
            return Auth.getUID(FACEBOOK.name);
        };

        FB.search = function (input, callBack) {
            var fbr = 'https://graph.facebook.com/me/feed?&access_token=' + FB.getToken() + '&callback=JSON_CALLBACK';
            $http.jsonp(fbr).success(function (data) {
                if (data) {
                    callBack(data);
                }
            });
        };

        FB.getAuthURL = function () {
            return 'https://www.facebook.com/dialog/oauth?client_id=' + FACEBOOK.APP_ID + '&display=popup&scope=email,read_stream&response_type=token&redirect_uri=' + $window.location.origin + '/oauth/facebook/';
        };

        return FB;
    });