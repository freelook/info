'use strict';
angular
  .module('freelook.info')
  .directive('fliSettingAuth', function () {
    return {
      controller: 'auth.setting.ctrl',
      controllerAs: 'auth',
      templateUrl: 'components/views/setting/auth/auth.html'
    };
  });
