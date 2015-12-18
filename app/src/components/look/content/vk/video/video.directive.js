'use strict';
angular.module('fli.look')
  .directive('fliLookContentVkVideo', function () {
    return {
      controller: 'look.content.vk.video.ctrl',
      controllerAs: 'vkCtrl',
      templateUrl: 'components/look/content/vk/video/video.html'
    };
  });
