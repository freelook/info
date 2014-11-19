'use strict';

angular
    .module('core')
    .controller('FreeLookController',
    function ($rootScope, $scope, $route, $location, $routeParams, $mdSidenav, VK, Google,FB) {

        $scope.toggleLeft = function() {
            $mdSidenav('start').toggle();
        };
        $scope.toggleRight = function() {
            $mdSidenav('info').toggle();
        };

        $rootScope.$on('$routeChangeStart', function () {
            $rootScope.loading = true;
        });

        $rootScope.$on('$routeChangeSuccess', function () {
            $rootScope.loading = false;
        });

        $rootScope.go = function (params) {
            $route.updateParams(params);
        };

        $rootScope.do = function (input) {
            $route.updateParams({input: input});
            switch ($rootScope.route.social) {
                case 'vk':
                    VK.search(input, function (data) {
                        $rootScope.vk = {
                            data: data
                        };
                    });
                    break;
                case 'google':
                    Google.search(input, function (data) {
                        $rootScope.google = {
                            data: data
                        };
                    });
                    break;
                case 'facebook':
                    FB.search(input, function(data){
                        $rootScope.facebook = {
                            data: data
                        };
                    });
                    break;
            }
        };

    });
