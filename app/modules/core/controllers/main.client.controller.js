'use strict';

angular
    .module('core')
    .controller('MainController',
    function ($rootScope, $scope, $window, $location, Authentication) {

        $rootScope.$on('$routeChangeStart', function () {
            $rootScope.loading = true;
        });

        $rootScope.$on('$routeChangeSuccess', function () {
            $rootScope.loading = false;
        });

        $scope.authentication = Authentication;
        var loc = $location.absUrl() + '1111';

        if($window.VK) {
            $window.VK.init({apiId: 3520312, onlyWidgets: true});
            $window.VK.Widgets.Like('vk_signin', {type: 'button', height: 24, pageUrl: loc});
            $window.VK.Widgets.Post('vk_post', -50609732, 124, 'hWNjwJubCJ69XFWPH_s0GcVXSnI');
        }

        console.dir(loc);


        var scrollItems = [];

        for (var i = 1; i <= 100; i++) {
            scrollItems.push('Item ' + i);
        }

        $scope.scrollItems = scrollItems;
        $scope.invoice = {payed: true};

        $scope.userAgent = navigator.userAgent;

    });