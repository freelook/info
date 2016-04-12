'use strict';
angular
  .module('fli.views')
  .directive('fliSettingFacebook', function () {
    return {
      controller: 'setting.facebook.ctrl',
      controllerAs: 'fb',
      templateUrl: 'components/views/setting/facebook/facebook.html'
    };
  });

