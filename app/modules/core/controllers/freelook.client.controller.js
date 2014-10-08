'use strict';

angular
    .module('core')
    .controller('FreeLookController',
    function ($rootScope, $scope, VK, Authentication) {

        $rootScope.$on('$routeChangeStart', function () {
            $rootScope.loading = true;
        });

        $rootScope.$on('$routeChangeSuccess', function () {
            $rootScope.loading = false;
        });

        $scope.authentication = Authentication;

        VK.onLiked(
            function () {
                VK.signIn();
            }
        );

    });