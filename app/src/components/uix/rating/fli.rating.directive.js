'use strict';
angular
  .module('freelook.info')
  .directive('fliRating', function () {
    return {
      restrict: 'EA',
      templateUrl: 'components/uix/rating/fli.rating.html',
      scope: {
        rating: '=ngModel',
        max: '=?'
      },
      link: function (scope) {
        if (!scope.max) {
          scope.max = 5;
        }

        function updateStars() {
          scope.stars = [];
          for (var i = 0; i < scope.max; i++) {
            scope.stars.push({
              filled: i < scope.rating
            });
          }
        }

        updateStars();
      }
    };
  });

