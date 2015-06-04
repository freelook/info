'use strict';

angular
  .module('fli.look')
  .factory('content', function (url) {

    function site(_url) {
      var site = url.parse(decodeURIComponent(_url));
      return site.host;
    }

    return {
      site: site
    };

  });
