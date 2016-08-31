'use strict';
angular
  .module('fli.home')
  .directive('fliHomeDashboard', function () {
    return {
      controller: 'home.dashboard.ctrl',
      controllerAs: 'dashboard',
      templateUrl: 'components/home/dashboard/dashboard.html'
    };
  });
