'use strict';

angular
    .module('core')
    .controller('StartController', function ($rootScope, $scope, Auth, Services, Config) {
        $scope.oauth = function (socialName) {
            var oauthURl = Services[socialName].getAuthURL();
            Auth.oauth(oauthURl);
        };
        $scope.clear = function (profile) {
            Auth.clearUser(profile);
        };
        $scope.add = function () {
            var url = 'https://chrome.google.com/webstore/detail/dlliipgdjogiifieihjpfoccjnnmjild';
            Config.install(url);
        };
    });
