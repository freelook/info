'use strict';
angular
  .module('freelook.info')
  .directive('fliSetting', function () {
    return {
      controller: 'setting.ctrl',
      controllerAs: 'setting',
      templateUrl: 'components/_index/core/uix/setting/setting.html'
    };
  });
