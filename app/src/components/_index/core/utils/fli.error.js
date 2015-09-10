'use strict';
angular
  .module('freelook.info')
  .directive('fliErr', function ($http, $window) {
    return function (scope, el, attr) {


      el.on('error', function () {
        if (attr.ngSrc) {
          var src = attr.ngSrc.substr(0, 2) === '//' ? 'http:' + attr.ngSrc : attr.ngSrc;
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
