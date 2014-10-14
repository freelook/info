'use strict';

angular
    .module('core')
    .controller('StartController', function ($rootScope, $scope, VK) {
        $scope.vk_oauth = function(){
            VK.oauth();
        };
    });
