'use strict';

// Setting up route
angular
    .module('core')
    .config(
    function ($routeProvider) {
        // Redirect to home view when route not found
        $routeProvider.otherwise('/look');

        // Home state routing
        $routeProvider.
            when('/:action', {
                templateUrl: 'modules/core/views/main.client.view.html',
                controller: 'MainController'
            })
            .when('/oauth/:social', {
                template: '',
                controller: 'AuthController'

            })
    }
);