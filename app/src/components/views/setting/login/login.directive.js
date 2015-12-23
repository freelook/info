'use strict';
angular
  .module('freelook.info')
  .directive('fliSettingLogin', function () {
    return {
      controller: 'login.setting.ctrl',
      controllerAs: 'login',
      templateUrl: 'components/views/setting/login/login.html'
    };
  });
