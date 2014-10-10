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

        $rootScope.go = function(params) {
            $route.updateParams(params);
        };

        $rootScope.do = function (input) {
            $route.updateParams({input: input});
            VK.search(input, function(data){
                $rootScope.vk = {
                    data: data
                };
            });
        };

        $rootScope.auth = Authentication;

        VK.onLiked(
            function () {
                VK.signIn();
            }
        );
    });