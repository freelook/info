'use strict';
angular
  .module('fli.search')
  .factory('api', function ($q, $http, $window) {

    function get(url) {
      if (url) {
        var defer = $q.defer(),
          api = $window.CONFIG.API.URL + '/get?url=' + encodeURIComponent(url) + '&callback=JSON_CALLBACK';
        $http.jsonp(api)
          .success(function (html) {
            if (!html.Error) {
              defer.resolve(html);
            } else {
              defer.reject(html);
            }
          })
          .error(function (html) {
            console.info('Sorry error');
            defer.reject(html);
          });

        return defer.promise;
      }
    }

    return {
      get: get
    };

  });


