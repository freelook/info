'use strict';

angular
    .module('core')
    .controller('StartController', function ($rootScope, $scope, Authentication, VK) {
        $scope.vk_oauth = function(){
            VK.oauth();
        };

        $scope.clear = function() {
            Authentication.clearVKUser();
        };
    });
