'use strict';

angular
    .module('core')
    .controller('StartController', function ($rootScope, $scope, Authentication) {
        $scope.oauth = function (socialName) {
             Authentication.oauth(socialName);
        };
        $scope.clear = function (profile) {
            switch(profile) {
                case 'vk':
                    Authentication.clearVKUser();
                    break;
                case 'facebook':
                    Authentication.clearFBUser();
                    break;
            }
        };
    });
