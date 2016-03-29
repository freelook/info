'use strict';
angular
  .module('freelook.info')
  .directive('fliMore',
  function () {
    return {
      templateUrl: 'components/uix/more/more.html',
      scope: {
        more: '&'
      }
    };
  });
