'use strict';
angular
  .module('fli.views')
  .directive('fliSettingTabs', function () {
    return {
      controller: 'tabs.setting.ctrl',
      controllerAs: 'tabs',
      templateUrl: 'components/views/setting/tabs/tabs.html'
    };
  });
