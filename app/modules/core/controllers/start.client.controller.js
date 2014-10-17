'use strict';

angular
    .module('core')
    .controller('StartController', function ($rootScope, $scope, Auth, Services) {
        $scope.oauth = function (socialName) {
            var oauthURl = Services[socialName].getAuthURL();
            Auth.oauth(oauthURl);
        };
        $scope.clear = function (profile) {
            Auth.clearUser(profile);
        };
    });
