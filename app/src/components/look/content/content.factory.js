'use strict';

angular
  .module('fli.look')
  .factory('content', function (url) {

    function site(_url) {
      var link = url.parse(decodeURIComponent(_url)) || {};
      return link;
    }

    return {
      site: site
    };

  });
