/**
 * The widget service provide helper functions to render widgets and their content.
 */
angular.module('adf')
  .factory('widgetService', function ($http, $q, $sce, $templateCache, dashboard) {
    'use strict';

    function parseUrl(url) {
      var parsedUrl = url;
      if (url.indexOf('{widgetsPath}') >= 0) {
        parsedUrl = url.replace('{widgetsPath}', dashboard.widgetsPath)
          .replace('//', '/');
        if (parsedUrl.indexOf('/') === 0) {
          parsedUrl = parsedUrl.substring(1);
        }
      }
      return parsedUrl;
    }

    var exposed = {};

    exposed.getTemplate = function (widget) {
      var deferred = $q.defer();

      if (widget.template) {
        deferred.resolve(widget.template);
      } else if (widget.templateUrl) {
        // try to fetch template from cache
        var tpl = $templateCache.get(widget.templateUrl);
        if (tpl) {
          deferred.resolve(tpl);
        } else {
          var url = $sce.getTrustedResourceUrl(parseUrl(widget.templateUrl));
          $http.get(url)
            .success(function (response) {
              // put response to cache, with unmodified url as key
              $templateCache.put(widget.templateUrl, response);
              deferred.resolve(response);
            })
            .error(function () {
              deferred.reject('could not load template');
            });
        }
      }

      return deferred.promise;
    };

    return exposed;
  });
