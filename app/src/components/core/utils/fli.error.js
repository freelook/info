'use strict';
angular
  .module('freelook.info')
  .directive('fliErr', function ($compile, $http, $window) {
    return function (scope, el, attr) {

      var blobSrc = '';

      function showEmpty() {
        var $el = $(el);
        $el.closest('md-card.fli-item').addClass('small');
        $el.replaceWith($compile('<div class="md-card-image header" fli-item-icon="f"></div>')(scope));
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
