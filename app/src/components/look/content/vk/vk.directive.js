'use strict';
angular.module('fli.look')
  .directive('fliLookContentVk', function () {
    return {
      controller: 'look.content.vk.ctrl',
      controllerAs: 'vk',
      templateUrl: 'components/look/content/vk/vk.html'
    };

  })
;
