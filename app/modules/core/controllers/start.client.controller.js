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
        $scope.add = function () {
            var url = 'https://chrome.google.com/webstore/detail/dlliipgdjogiifieihjpfoccjnnmjild';
            var callBack = function () {
                console.dir(arguments);
            };
            window.chrome.webstore.install(url, callBack, callBack);
        };
    });
