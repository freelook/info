'use strict';
angular
  .module('freelook.info')
  .directive('fliErr', function ($http, $window) {
    return function (scope, el, attr) {


      el.on('error', function () {
        var attrSrc = attr.ngSrc || attr.src;
        if (attrSrc) {
          var src = attrSrc.substr(0, 2) === '//' ? 'http:' + attrSrc : attrSrc;
          $http
            .get(src, {responseType: 'blob'})
            .success(function (res) {
              el.attr('src', $window.URL.createObjectURL(res));
            })
            .error(function () {
              $(el)
                .after('<div class="md-card-image header"></div>')
                .remove();
            });
        }
      });

    };
  });
