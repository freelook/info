'use strict';
angular
  .module('fli.profile')
  .directive('fliProfileInput', function () {
    return {
      controller: 'profile.input.ctrl',
      controllerAs: 'profileInput',
      templateUrl: 'components/profile/input/input.html'
    };
  });
