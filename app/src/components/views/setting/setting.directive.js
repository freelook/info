'use strict';
angular
  .module('freelook.info')
  .directive('fliSetting', function () {
    return {
      controller: 'setting.ctrl',
      controllerAs: 'setting',
      templateUrl: 'components/views/setting/setting.html'
    };
  });
