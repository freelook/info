'use strict';
angular
  .module('freelook.info')
  .directive('fliDonate', function () {
    return {
      controller: 'donate.ctrl',
      controllerAs: 'donate',
      templateUrl: 'components/uix/donate/donate.html'
    };
  });
