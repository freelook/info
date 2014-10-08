'use strict';

angular
    .module('core')
    .controller('HomeController',
    function ($rootScope, $routeParams, $scope, VK ) {
        $rootScope.route = $routeParams;

        console.dir($routeParams);
    });


angular.module('core').directive('carouselExampleItem', function ($rootScope, $swipe) {
    return function (scope, element, attrs) {
        var startX = null;
        var startY = null;
        var endAction = 'cancel';
        var carouselId = element.parent().parent().attr('id');

        var translateAndRotate = function (x, y, z, deg) {
            element[0].style['-webkit-transform'] = 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px) rotate(' + deg + 'deg)';
            element[0].style['-moz-transform'] = 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px) rotate(' + deg + 'deg)';
            element[0].style['-ms-transform'] = 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px) rotate(' + deg + 'deg)';
            element[0].style['-o-transform'] = 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px) rotate(' + deg + 'deg)';
            element[0].style.transform = 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px) rotate(' + deg + 'deg)';
        };

        $swipe.bind(element, {
            start: function (coords) {
                endAction = null;
                startX = coords.x;
                startY = coords.y;
            },

            cancel: function (e) {
                endAction = null;
                translateAndRotate(0, 0, 0, 0);
                e.stopPropagation();
            },

            end: function (coords, e) {
                if (endAction === 'prev') {
                    $rootScope.carouselPrev(carouselId);
                } else if (endAction === 'next') {
                    $rootScope.carouselNext(carouselId);
                }
                translateAndRotate(0, 0, 0, 0);
                e.stopPropagation();
            },

            move: function (coords) {
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