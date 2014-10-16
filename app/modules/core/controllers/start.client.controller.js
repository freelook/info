'use strict';

angular
    .module('core')
    .controller('StartController', function ($rootScope, $scope, Authentication, VK, FB) {
        $scope.vk_oauth = function () {
            VK.oauth();
        };
        $scope.fb_oauth = function () {
            FB.oauth();
        };
        $scope.clear = function () {
            Authentication.clearVKUser();
        };
    });
