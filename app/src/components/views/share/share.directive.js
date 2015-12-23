'use strict';
angular
  .module('freelook.info')
  .directive('fliShare', function () {
    return {
      controller: 'share.ctrl',
      controllerAs: 'share',
      templateUrl: 'components/views/share/share.html'
    };
  });
