'use strict';
angular
  .module('fli.views')
  .directive('fliSetting', function () {
    return {
      controller: 'setting.ctrl',
      controllerAs: 'setting',
      templateUrl: 'components/views/setting/setting.html'
    };
  });
