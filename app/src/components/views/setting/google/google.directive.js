'use strict';
angular
  .module('fli.views')
  .directive('fliSettingGoogle', function () {
    return {
      controller: 'setting.google.ctrl',
      controllerAs: 'google',
      templateUrl: 'components/views/setting/google/google.html'
    };
  });

