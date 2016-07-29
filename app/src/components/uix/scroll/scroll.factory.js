'use strict';
angular
  .module('freelook.info')
  .factory('scroll', function () {

    function top() {
      $(document).scrollTop(0);
    }

    function routeChangeSuccess() {
      top();
    }

    return {
      top: top,
      routeChangeSuccess: routeChangeSuccess
    };

  });



