'use strict';
angular
  .module('fli.search')
  .directive('fliSubHideOnScroll',
  function ($window, $timeout, $mdMedia) {
    return function (scope, element) {

      var top = 300,
        timeout = null,
        document = $($window.document);

      function scroll() {
        if ($mdMedia('sm')) {
          if (document.scrollTop() > top) {
            element.hide();
          } else {
            element.show();
          }
        }
      }

      document.scroll(function () {
        if (timeout) {
          $timeout.cancel(timeout);
          timeout = null;
        }
        timeout = $timeout(scroll, 33);
      });

    };
  });

