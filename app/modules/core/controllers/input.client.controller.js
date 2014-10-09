'use strict';
angular
    .module('core')
    .controller('InputController', function ($scope) {
        $scope.do = function (data) {
            console.log(data);
        };
    });
