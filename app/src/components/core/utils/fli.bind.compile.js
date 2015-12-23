'use strict';
angular
  .module('freelook.info')
  .directive('fliBindCompile', function ($compile) {
    return function (scope, element, attr) {
      scope.$watch(function () {
        return scope.$eval(attr.fliBindCompile);
      }, function (value) {
        element.html(value);
        $compile(element.contents())(scope);
      });
    };
  });
