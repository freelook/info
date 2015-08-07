'use strict';
angular
  .module('freelook.info')
  .directive('fliItemImg', function () {
    return {
      link: function (scope, el) {
        el.on('load', function () {
          var imgEl = el.get(0) || {};
          scope.fliItemCtrl.small = imgEl.naturalWidth < 101;
        });
      }
    };
  });

