'use strict';
angular
  .module('freelook.info')
  .factory('prerender', function ($q, $http, $timeout, api, CONFIG) {

    function get(url) {
      if (url) {
        var api = CONFIG.PRERENDER.URL + encodeURIComponent(url);
        return $http.get(api);
      }
    }

    function cache(_url) {
      return api.proxy(CONFIG.PRERENDER.URL + _url, {cache: true});
    }

    function local(url) {
      var defer = $q.defer();
      var webview = $('#prerender').attr('src', url);

      webview.on('loadstop', function () {
        if (webview && webview.length) {
          $timeout(function () {
            webview[0].executeScript({code: 'document.documentElement.innerHTML'},
              function (html) {
                if (html && html.length) {
                  return defer.resolve(html[0]);
                }
              });
          }, 1000);
        }
      });

      webview.on('loadabort', function (data) {
        return defer.reject(data);
      });

      return defer.promise;
    }

    return {
      get: get,
      cache: cache,
      local: local
    };

  });


