'use strict';

angular
    .module('core')
    .controller('AuthController',
    function ($rootScope, $scope, $routeParams, $location, VK, Authentication) {


        var hash = $location.hash();

        $scope.url2json = function( url ) {
            return JSON.parse('{"' + decodeURI(url).replace(/#/g, '').replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
        };


        if(hash) {
            Authentication.setVKUser($scope.url2json(hash));
            VK.getSocialInfo();
            $location.hash('');
            $location.path('/look');
        }

    });
