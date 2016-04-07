'use strict';
angular
  .module('freelook.info')
  .directive('fliErr', function ($compile, $http, $window) {
    return function (scope, el, attr) {

      var blobSrc = '';

      function showEmpty() {
        var $el = $(el);

        if (attr.fliErr === 'remove') {
          $el.remove();
        } else {
          var letters = attr.title || attr.alt || 'f';
          $el.closest('md-card.fli-item').addClass('small');
          $el.replaceWith($compile('<div class="md-card-image header fli-err" fli-item-icon="' + letters + '"></div>')(scope));
        }
      }

      $(el).on('error', function () {
        var attrSrc = attr.ngSrc || attr.src || '',
          src = ({'ht': attrSrc, '//': 'http:' + attrSrc})[attrSrc.substr(0, 2)] || '';

        if (attrSrc && src && !blobSrc) {
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
      });

    };
  });
