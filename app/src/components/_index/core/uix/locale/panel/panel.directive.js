'use strict';
angular
  .module('freelook.info')
  .directive('fliLocalePanel', function () {
    return {
      controller: 'locale.panel.ctrl',
      controllerAs: 'localePanel',
      templateUrl: 'components/_index/core/uix/locale/panel/panel.html'
    };
  });
