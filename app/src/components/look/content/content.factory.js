'use strict';

angular
  .module('fli.look')
  .factory('content', function (url) {

    function site(_url) {
      var link = url.parse(decodeURIComponent(_url)) || {},
        name = url.extract('(:subdomain.):domain.:tld(/*)', link.hostname) || {};
      return angular.extend(link, name);
    }

    return {
      site: site
    };

  });
