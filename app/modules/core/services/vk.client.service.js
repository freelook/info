'use strict';
angular
    .module('core')
    .factory('VK',
    function ($window, $location, $http, $rootScope, Authentication, LocalStorage, toaster) {

        // TODO use constant!

        var VK = {};
        VK.init = function () {
            if ($window.VK && $window.VK.Widgets) {
                var loc = $location.host() + '/' + Authentication.date;
                $window.VK.init({apiId: 3520312, onlyWidgets: true});
                if (!Authentication.isVK()) {
                    $window.VK.Widgets.Like('vk_signin', {type: 'vertical', verb: 1, height: 24, pageUrl: loc});
                }
                $window.VK.Widgets.Post('vk_post', -50609732, 124, 'hWNjwJubCJ69XFWPH_s0GcVXSnI');
            }
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
           $window.location = '/auth/vkontakte';
        };


        return VK;
    }
);
