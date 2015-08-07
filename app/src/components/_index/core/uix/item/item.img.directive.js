'use strict';
angular
  .module('freelook.info')
  .directive('fliItemImg', function () {
    return {
      link: function (scope, el) {
        el.on('load', function () {
          var imgEl = el.get(0) || {};
          if (imgEl.naturalWidth < 101) {
            $(el).closest('md-card.fli-item').addClass('small');
          }
        });
      }
    };
  });

