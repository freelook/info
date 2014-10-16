'use strict';
angular
    .module('core')
    .factory('FB', ['$window','$http','LocalStorage','Authentication', function ($window, $http,LocalStorage,Authentication) {
        var FB = {},
            appId = '846841298681206',
            appSecret = '4b26d1410aa833669735ace0cf7fd39d';
        FB.init = function () {
            $window.fbAsyncInit = function () {
                // Executed when the SDK is loaded

                $window.FB.init({

                    /*
                     The app id of the web app;
                     To register a new app visit Facebook App Dashboard
                     ( https://developers.facebook.com/apps/ )
                     */

                    appId: appId,

                    /*
                     Adding a Channel File improves the performance
                     of the javascript SDK, by addressing issues
                     with cross-domain communication in certain browsers.
                     */

                    channelUrl: 'app/channel.html',

                    /*
                     Set if you want to check the authentication status
                     at the start up of the app
                     */

                    status: true,

                    /*
                     Enable cookies to allow the server to access
                     the session
                     */

                    cookie: true,

                    /* Parse XFBML */

                    xfbml: true
                });

            }
        };
        // load the Facebook javascript SDK
        (function (d) {
            var js,
                id = 'facebook-jssdk',
                ref = d.getElementsByTagName('script')[0];

            if (d.getElementById(id)) {
                return;
            }

            js = d.createElement('script');
            js.id = id;
            js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";

            ref.parentNode.insertBefore(js, ref);

        }(document));


        //login via Facebook
        FB.user = function () {
            return LocalStorage.getFB();
        }
        FB.oauth = function () {
            var authURL = 'https://www.facebook.com/dialog/oauth?client_id=' + appId + '&display=popup&scope=email,user_likes&response_type=token&redirect_uri=' + $window.location.origin + '/oauth/fb/';
            $window.location = authURL;
        }
        FB.getSocialInfo = function (callBack) {
            if (!callBack) {
                callBack = function (data) {
                    if (data) {
                        var value = angular.extend(LocalStorage.getFB(), data);
                        Authentication.setFBUser(value);
                    }
                };
            }
//            https://graph.facebook.com/me?fields=id&access_token="xxxx
            var fbr = 'https://graph.facebook.com/me?fields=id,name&access_token='+Authentication.user.fb.access_token+'&callback=JSON_CALLBACK';
            $http.jsonp(fbr).success(function (data) {
                if (data) {
                    callBack(data.response);
                }
            });
        }
        return FB;
    }]);