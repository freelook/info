'use strict';
angular
  .module('fli.core')
  .factory('rasterize', function ($window, $timeout, $q) {

    function init() {
      if ($window.rasterizeHTML) {
        return $q.when($window.rasterizeHTML);
      }
      var defer = $q.defer();
      $timeout(function () {
        var js, id = 'rasterizeHTML', d = document, s = 'script',
          fjs = d.getElementsByTagName(s)[0];
        if (!d.getElementById(id)) {
          js = d.createElement(s);
          js.id = id;
          js.src = 'vendors/rasterizeHTML/rasterizeHTML.allinone.js';
          js.onload = function () {
            defer.resolve($window.rasterizeHTML);
          };
          fjs.parentNode.insertBefore(js, fjs);
        }
      }, 0);
      return defer.promise;
    }

    return {
      init: init
    };

  });


