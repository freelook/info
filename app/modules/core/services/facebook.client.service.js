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
            var authURL = 'https://www.facebook.com/dialog/oauth?client_id=' + appId + '&display=popup&scope=email,read_stream&response_type=token&redirect_uri=' + $window.location.origin + '/oauth/fb/';
            $window.location = authURL;
        };

        FB.getAvatar = function() {
            var fbr = 'https://graph.facebook.com/me/picture?&access_token=' + FB.getToken() + '&callback=JSON_CALLBACK';
            $http.jsonp(fbr).success(function (r ) {
                if (r && r.data) {
                    FB.setSocialInfo(r.data);
                }
            });
        };

        FB.setSocialInfo = function(data) {
                if (data) {
                    var value = angular.extend(LocalStorage.getFB(), data);
                    Authentication.setFBUser(value);
                }
        };

        FB.getSocialInfo = function (callBack) {
            if (!callBack) {
                callBack = FB.setSocialInfo;
            }
            var fbr = 'https://graph.facebook.com/me?&access_token=' + Authentication.user.fb.access_token + '&callback=JSON_CALLBACK';
            $http.jsonp(fbr).success(function (data) {
                if (data) {
                    callBack(data);
                    FB.getAvatar();
                }
            });
        };

        FB.getToken = function() {
            return Authentication.user.fb.access_token;
        };

        FB.getID = function() {
            return Authentication.user.fb.id;
        };
        FB.search=function(callBack){
            var fbr='https://graph.facebook.com/me/feed?&access_token=' + Authentication.user.fb.access_token + '&callback=JSON_CALLBACK';
            $http.jsonp(fbr).success(function (data) {
                if (data) {
                    callBack(data);
                }
            });
        }
        return FB;
    });