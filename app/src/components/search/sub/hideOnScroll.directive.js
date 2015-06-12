'use strict';
angular
  .module('fli.search')
  .directive('fliSubHideOnScroll',
  function ($window, $timeout) {
    return function (scope, el) {

      var element = $(el),
        sub = $('#sub'),
        top = sub.offset().top + sub.height(),
        timeout = null,
        document = $($window.document);

      function scroll() {
        if (document.scrollTop() > top) {
          element.hide();
        } else {
          element.show();
        }
      }

      document.scroll(function () {
        if (timeout) {
          $timeout.cancel(timeout);
          timeout = null;
        }
        timeout = $timeout(scroll, 100);
      });

    };
  });

