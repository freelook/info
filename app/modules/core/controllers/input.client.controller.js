'use strict';
angular
    .module('core')
    .controller('InputController', function ($rootScope, $scope, $route, VK) {
        $scope.submit = function(form) {
            if(form.data && form.data.$viewValue) {
                $rootScope.do(form.data.$viewValue);
            }
        };
    });
