'use strict';
angular
  .module('freelook.info')
  .directive('fliHref', function ($rootScope, platform) {
    return function (scope, el, attr) {

      var handlers = {
        site: function () {
          $(el).attr('href', attr.fliHref);
        },
        chrome: function () {
          $(el).attr('href', attr.fliHref).on('click', function () {
            $rootScope.go(attr.fliHref);
          });
        }
      };

      handlers[platform.name()]();

    };
  });
