'use strict';
angular
    .module('core')
    .factory('FB', function ($window, $http, LocalStorage, Authentication) {
        var FB = {},
            appId = '846841298681206';

        //login via Facebook
        FB.user = function () {
            return LocalStorage.getFB();
        };

        FB.oauth = function () {
            var authURL = 'https://www.facebook.com/dialog/oauth?client_id=' + appId + '&display=popup&scope=email,user_likes&response_type=token&redirect_uri=' + $window.location.origin + '/oauth/fb/';
            $window.location = authURL;
        };

        FB.getSocialInfo = function (callBack) {
            if (!callBack) {
                callBack = function (data) {
                    if (data) {
                        var value = angular.extend(LocalStorage.getFB(), data);
                        Authentication.setFBUser(value);
                    }
                };
            }
            var fbr = 'https://graph.facebook.com/me?fields=id,name&access_token=' + Authentication.user.fb.access_token + '&callback=JSON_CALLBACK';
            $http.jsonp(fbr).success(function (data) {
                if (data) {
                    callBack(data);
                }
            });
        };

        return FB;
    });