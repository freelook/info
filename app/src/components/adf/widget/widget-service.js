/**
 * The widget service provide helper functions to render widgets and their content.
 */
angular.module('adf')
  .factory('widgetService', function ($http, $q, $sce, $templateCache) {
    'use strict';

    function render(widget) {
      var deferred = $q.defer();
      var tpl = $templateCache.get(widget.name);
      if (tpl) {
        deferred.resolve(tpl);
      } else {
        $http.post('/api/widget/render', JSON.stringify(widget, function (key, val) {
          return (typeof val === 'function') ? '' + val : val;
        }))
          .success(function (response) {
            // put response to cache, with unmodified url as key
            $templateCache.put(widget.name, response);
            deferred.resolve(response);
          })
          .error(function () {
            deferred.reject('could not load template');
          });
      }

      return deferred.promise;
    }

    return {
      render: render
    };
  });
