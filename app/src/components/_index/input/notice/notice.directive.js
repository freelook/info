'use strict';
angular
  .module('freelook.info')
  .directive('fliInputNotice', function () {
    return {
      controller: 'input.notice.ctrl',
      controllerAs: 'noticeCtrl',
      templateUrl: 'components/_index/input/notice/notice.html'
    };
  });
