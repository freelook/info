'use strict';
angular
  .module('freelook.info')
  .factory('scroll', function () {

    function top() {
      $(document).scrollTop(0);
    }

    return {
      top: top
    };

  });



