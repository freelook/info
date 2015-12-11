'use strict';
angular
  .module('freelook.info')
  .directive('fliSettingUser', function () {
    return {
      controller: 'user.setting.ctrl',
      controllerAs: 'user',
      templateUrl: 'components/_index/setting/user/user.html'
    };
  });
