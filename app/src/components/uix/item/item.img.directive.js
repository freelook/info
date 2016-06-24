'use strict';
angular
  .module('freelook.info')
  .directive('fliItemImg', function () {
    return {
      link: function (scope, $el, attr) {
        $el.on('load', function () {
          var imgEl = $el.get(0) || {};
          if (imgEl.naturalWidth < 200) {
            if (attr.fliItemImg === 'self') {
              $el.addClass('fli-item-img-small');
            } else {
              $el.closest('md-card.fli-item').addClass('small');
            }
          }
        });
      }
    };
  });

