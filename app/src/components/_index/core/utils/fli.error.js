'use strict';
angular
  .module('freelook.info')
  .directive('fliErr', function ($http, $window) {
    return function (scope, el, attr) {

      var blobSrc = '';

      function showEmpty() {
        $(el)
          .after('<div class="md-card-image header"></div>')
          .remove();
      }

      $(el).on('error', function () {
        var attrSrc = attr.ngSrc || attr.src;
        if (attrSrc) {
          var src = attrSrc.substr(0, 2) === '//' ? 'http:' + attrSrc : attrSrc;
          if (!blobSrc) {
            $http
              .get(src, {responseType: 'blob'})
              .success(function (res) {
                blobSrc = $window.URL.createObjectURL(res);
                $(el).attr('src', blobSrc);
              })
              .error(function () {
                showEmpty();
              });
          } else {
            showEmpty();
          }
        }
      });

    };
  });
