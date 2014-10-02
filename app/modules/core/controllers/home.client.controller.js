'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
]);

angular.module('core').directive('carouselExampleItem', function($rootScope, $swipe) {
	return function(scope, element, attrs) {
		var startX = null;
		var startY = null;
		var endAction = 'cancel';
		var carouselId = element.parent().parent().attr('id');

		var translateAndRotate = function(x, y, z, deg) {
			element[0].style['-webkit-transform'] = 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px) rotate(' + deg + 'deg)';
			element[0].style['-moz-transform'] = 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px) rotate(' + deg + 'deg)';
			element[0].style['-ms-transform'] = 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px) rotate(' + deg + 'deg)';
			element[0].style['-o-transform'] = 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px) rotate(' + deg + 'deg)';
			element[0].style.transform = 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px) rotate(' + deg + 'deg)';
		};

		$swipe.bind(element, {
			start: function(coords) {
				endAction = null;
				startX = coords.x;
				startY = coords.y;
			},

			cancel: function(e) {
				endAction = null;
				translateAndRotate(0, 0, 0, 0);
				e.stopPropagation();
			},

			end: function(coords, e) {
				if (endAction === 'prev') {
					$rootScope.carouselPrev(carouselId);
				} else if (endAction === 'next') {
					$rootScope.carouselNext(carouselId);
				}
				translateAndRotate(0, 0, 0, 0);
				e.stopPropagation();
			},

			move: function(coords) {
				if (startX !== null) {
					var deltaX = coords.x - startX;
					var deltaXRatio = deltaX / element[0].clientWidth;
					if (deltaXRatio > 0.3) {
						endAction = 'next';
					} else if (deltaXRatio < -0.3) {
						endAction = 'prev';
					} else {
						endAction = null;
					}
					translateAndRotate(deltaXRatio * 200, 0, 0, deltaXRatio * 15);
				}
			}
		});
	};
});

angular.module('core').controller('MainController', function($rootScope, $scope) {

	$rootScope.$on('$routeChangeStart', function() {
		$rootScope.loading = true;
	});

	$rootScope.$on('$routeChangeSuccess', function() {
		$rootScope.loading = false;
	});

	var scrollItems = [];

	for (var i = 1; i <= 100; i++) {
		scrollItems.push('Item ' + i);
	}

	$scope.scrollItems = scrollItems;
	$scope.invoice = {payed: true};

	$scope.userAgent = navigator.userAgent;
	$scope.chatUsers = [
		{ name: 'Carlos  Flowers', online: true },
		{ name: 'Byron Taylor', online: true },
		{ name: 'Jana  Terry', online: true },
		{ name: 'Darryl  Stone', online: true },
		{ name: 'Fannie  Carlson', online: true },
		{ name: 'Holly Nguyen', online: true },
		{ name: 'Bill  Chavez', online: true },
		{ name: 'Veronica  Maxwell', online: true },
		{ name: 'Jessica Webster', online: true },
		{ name: 'Jackie  Barton', online: true },
		{ name: 'Crystal Drake', online: false },
		{ name: 'Milton  Dean', online: false },
		{ name: 'Joann Johnston', online: false },
		{ name: 'Cora  Vaughn', online: false },
		{ name: 'Nina  Briggs', online: false },
		{ name: 'Casey Turner', online: false },
		{ name: 'Jimmie  Wilson', online: false },
		{ name: 'Nathaniel Steele', online: false },
		{ name: 'Aubrey  Cole', online: false },
		{ name: 'Donnie  Summers', online: false },
		{ name: 'Kate  Myers', online: false },
		{ name: 'Priscilla Hawkins', online: false },
		{ name: 'Joe Barker', online: false },
		{ name: 'Lee Norman', online: false },
		{ name: 'Ebony Rice', online: false }
	];

});