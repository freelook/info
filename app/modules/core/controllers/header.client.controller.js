'use strict';

angular.
    module('core').
    controller('HeaderController',
	function($scope, Auth) {
		$scope.authentication = Auth;

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	});