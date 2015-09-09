'use strict';
angular
  .module('freelook.info')
  .directive('fliErr', function ($http, $window) {
    return function (scope, el, attr) {


      el.on('error', function () {
        if (attr.ngSrc) {
          var xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = function () {
            el.attr('src', $window.URL.createObjectURL(xhr.response));
          };
          xhr.onerror = function () {
            $(el)
              .after('<div class="md-card-image header"></div>')
              .remove();
          };
          xhr.open('GET', attr.ngSrc, true);
          xhr.send();
        }
      });

    };
  });
