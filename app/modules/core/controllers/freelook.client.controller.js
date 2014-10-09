'use strict';

angular
    .module('core')
    .controller('FreeLookController',
    function ($rootScope, $scope, $route, $location, $routeParams, VK, Authentication) {

        $rootScope.$on('$routeChangeStart', function () {
            $rootScope.loading = true;
        });

        $rootScope.$on('$routeChangeSuccess', function () {
            $rootScope.loading = false;
        });

        $scope.go = function(params) {
            $route.updateParams(params);
        };

        $rootScope.auth = Authentication;

        VK.onLiked(
            function () {
                VK.signIn();
            }
        );
    });