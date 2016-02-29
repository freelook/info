'use strict';
angular
  .module('freelook.info')
  .factory('scroll', function ($rootScope) {

    function top() {
      $(document).scrollTop(0);
    }

    function init() {
      $rootScope.$on('$routeChangeStart', function () {
        top();
      });
    }

    return {
      init: init,
      top: top
    };

  });



