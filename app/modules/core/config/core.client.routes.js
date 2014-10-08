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
                templateUrl: 'modules/core/views/home.client.view.html',
                controller: 'HomeController'
            }).
            when('/:action/:social', {
                templateUrl: 'modules/core/views/home.client.view.html',
                controller: 'HomeController'
            });
    }
);