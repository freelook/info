'use strict';
angular
  .module('freelook.info')
  .factory('prerender', function ($q, $http, $window, toast) {

    function get(url) {
      if (url) {
        var defer = $q.defer(),
          api = $window.CONFIG.PRERENDER.URL + '/' + encodeURIComponent(url);
        $http.get(api)
          .success(function (html) {
            defer.resolve(html);
          })
          .error(function (html) {
            toast.show('something went wrong');
            defer.reject(html);
          });

        return defer.promise;
      }
    }

    return {
      get: get
    };

  });


