'use strict';
angular
  .module('fli.home')
  .directive('fliHomeLogo',
  function () {
    return {
      templateUrl: 'components/home/logo/logo.html'
    };
  });
