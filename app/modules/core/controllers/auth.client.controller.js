'use strict';

angular
    .module('core')
    .controller('AuthController',
    function ($rootScope, $scope, $routeParams, $location, VK, FB, Authentication) {
        var hash = $location.hash();
        $scope.url2json = function (url) {
            return JSON.parse('{"' + decodeURI(url).replace(/#/g, '').replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
        };
        if (hash) {
            switch ($routeParams.social) {
                //TODO case insensitive names of social factories+constants
                case 'vk':
                    Authentication.setVKUser($scope.url2json(hash));
                    VK.getSocialInfo();
                    break;
                case 'fb':
                    Authentication.setFBUser($scope.url2json(hash));
                    FB.getSocialInfo();
                    break;
            }
            $location.hash('');
            $location.path('/look');
        }

    });
