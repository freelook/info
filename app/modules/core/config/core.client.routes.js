'use strict';

// Setting up route
angular
	.module('core')
	.config(
	function($routeProvider) {
		// Redirect to home view when route not found
		$routeProvider.otherwise('/');

		// Home state routing
		$routeProvider.
			when('/', {
				templateUrl: 'modules/core/views/home.client.view.html'
			});
	}
);