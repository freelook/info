'use strict';
angular
  .module('freelook.info')
  .directive('fliDonate', function () {
    return {
      controller: 'donate.ctrl',
      controllerAs: 'donate',
      templateUrl: 'components/_index/core/uix/donate/donate.html'
    };
  });
