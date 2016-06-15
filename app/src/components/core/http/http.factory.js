'use strict';
angular
  .module('fli.core')
  .factory('http',
  function () {

    function is404(status) {
      return status && +status === 404;
    }

    return {
      is404: is404
    };

  });
