'use strict';
angular
  .module('freelook.info')
  .directive('fliNeedLogin', function ($rootScope) {
    return function () {
      if (!$rootScope.fli.user) {
        $rootScope.$broadcast('note', {text: 'show.needLogin'});
      }
    };
  });
