'use strict';

angular
    .module('core')
    .controller('AuthController',
    function ($rootScope, $scope, $routeParams, $location, Services, Auth) {
        var hash = $location.hash(),
            social = $routeParams.social;
        $scope.url2json = function (url) {
            return JSON.parse('{"' + decodeURI(url).replace(/#/g, '').replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
        };
        if (hash && social) {
            Auth.setUser(social, $scope.url2json(hash));
            Services[social].getSocialInfo();
            $location.hash('');
            $location.path('/look');
        }

    });
