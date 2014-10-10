'use strict';

angular
    .module('core')
    .controller('MainController',
    function ($rootScope, $routeParams) {
        $rootScope.route = $routeParams;

        if ($routeParams.input) {
            $rootScope.do($routeParams.input);
        }

    });