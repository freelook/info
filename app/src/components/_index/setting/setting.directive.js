'use strict';
angular
  .module('freelook.info')
  .directive('fliSetting', function () {
    return {
      controller: 'setting.ctrl',
      controllerAs: 'setting',
      templateUrl: 'components/_index/setting/setting.html'
    };
  });
