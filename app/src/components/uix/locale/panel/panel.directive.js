'use strict';
angular
  .module('freelook.info')
  .directive('fliLocalePanel', function () {
    return {
      controller: 'locale.panel.ctrl',
      controllerAs: 'localePanel',
      templateUrl: 'components/uix/locale/panel/panel.html',
      scope: {
        map: '='
      },
      bindToController: true
    };
  });
