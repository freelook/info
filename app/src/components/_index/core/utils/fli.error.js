'use strict';
angular
  .module('freelook.info')
  .directive('fliErr', function () {
    return function (scope, element) {
      element.on('error', function () {
        $(element)
          .after('<div class="md-card-image header"></div>')
          .remove();
      });
    };
  });
