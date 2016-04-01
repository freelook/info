'use strict';

angular
  .module('fli.look')
  .factory('content', function (url) {

    function site(_url) {
      var link = url.parse(decodeURIComponent(_url)) || {},
        _name = name(link.host) || {};
      return angular.extend(link, _name);
    }

    function name(host) {
      return url.extract('(:subdomain.):domain.:tld(/*)', host);
    }

    return {
      site: site,
      name: name
    };

  });
