'use strict';
angular
  .module('freelook.info')
  .directive('fliImg', function ($rootScope, $parse) {
    var amp = !!$parse('fli.route.amp')($rootScope);
    return {
      replace: true,
      template: amp ? '<amp-img></amp-img>' : '<img>'
    };
  });
