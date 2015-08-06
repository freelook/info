'use strict';
angular
  .module('freelook.info')
  .directive('fliShare', function () {
    return {
      controller: 'share.ctrl',
      controllerAs: 'share',
      templateUrl: 'components/_index/core/api/share/share.html'
    };
  });
