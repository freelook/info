'use strict';
angular
    .module('core')
    .factory('VK',
    function ($window, $location, $http, Authentication) {
    var VK = {};
        VK.init = function() {
            if($window.VK && $window.VK.Widgets) {
                var loc = $location.host()+ '/' + Authentication.date;
                console.dir(loc);
                $window.VK.init({apiId: 3520312, onlyWidgets: true});
                $window.VK.Widgets.Like('vk_signin', {type: 'vertical', verb: 1, height: 24, pageUrl: loc});
                $window.VK.Widgets.Post('vk_post', -50609732, 124, 'hWNjwJubCJ69XFWPH_s0GcVXSnI');
            }
        };

        VK.subscribe = function (event, callback) {
            if ($window.VK && $window.VK.Observer && $window.VK.Observer.subscribe) {
                $window.VK.Observer.subscribe(event, callback);
            }
        };
        VK.onLiked = function(callback) {
            VK.subscribe('widgets.like.liked', callback);
        };
        VK.onUnLiked = function(callback) {
            VK.subscribe('widgets.like.unliked', callback);
        };
        VK.signIn = function() {
            console.log('signinvk');
            $http.post('/auth/vk').then(function(response) {
                console.dir(response);
                if (response.data.success) {
                    $window.location = '/';
                } else {
                    // TODO: Show msg err
                    console.log('error');
                }
            });
        };
        return VK;
    }
);
