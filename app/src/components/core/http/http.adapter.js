'use strict';
angular
  .module('fli.core')
  .factory('httpAdapter',
  function ($http, platform) {

    var httpAdapters = {
      site: function (q, config) {
        return $http.jsonp(q + '&callback=JSON_CALLBACK', config);
      },
      mobile: function (q, config) {
        return $http.get(q, config);
      }
    };

    httpAdapters.chrome = httpAdapters.mobile;

    return httpAdapters[platform.name()];

  });
