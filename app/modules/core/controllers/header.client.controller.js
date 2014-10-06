'use strict';

angular.
    module('core').
    controller('HeaderController',
	function($scope, Authentication) {
		$scope.authentication = Authentication;

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	});