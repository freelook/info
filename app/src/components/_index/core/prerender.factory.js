'use strict';
angular
  .module('freelook.info')
  .factory('prerender', function ($window, $q, $http, $timeout, api, inAppBrowser, platform, CONFIG) {

    function get(url) {
      return $http.get(CONFIG.PRERENDER.URL + encodeURIComponent(url));
    }

    function cache(_url) {
      return api.proxy(CONFIG.PRERENDER.PRODUCTION + _url, {cache: true});
    }

    function chrome(url) {
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


    // not working for current plugin, try after update
    function mobile(url) {
      var defer = $q.defer(),
        ref = inAppBrowser.open(url, 'location=yes,hidden=yes');

      ref.addEventListener('loadstop', function () {
        $timeout(function () {
          ref.executeScript({code: 'document.documentElement.innerHTML'}, function (html) {
            if (html && html.length) {
              ref.close();
              return defer.resolve(html[0]);
            }
          });
        }, 1000);
      });

      ref.addEventListener('loaderror', function (data) {
        ref.close();
        return defer.reject(data);
      });

      return defer.promise;
    }

    return {
      get: get,
      cache: cache,
      local: platform.name() === 'chrome' ? chrome : mobile
    };

  });


