'use strict';
angular
  .module('freelook.info')
  .factory('url', function ($window) {

    function parse(_url) {
      var url = $window.document.createElement('a');
      url.href = _url;
      return url;
    }

    return {
      parse: parse
    };

  });



