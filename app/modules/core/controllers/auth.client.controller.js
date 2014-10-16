'use strict';

angular
    .module('core')
    .controller('AuthController',
    function ($rootScope, $scope, $routeParams, $location, VK,FB, Authentication) {
        var hash = $location.hash();
        $scope.url2json = function( url ) {
            return JSON.parse('{"' + decodeURI(url).replace(/#/g, '').replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
        };
        switch($routeParams.social){
            case 'vk':
                if(hash) {
                    Authentication.setVKUser($scope.url2json(hash));
                    VK.getSocialInfo();
                    $location.hash('');
                    $location.path('/look');
                }
                break;
            case 'fb':
                Authentication.setFBUser($scope.url2json(hash));
                FB.getSocialInfo();
                $location.hash('');
                $location.path('/look');
                break;
            default:
                break;
        }


    });
