'use strict';
angular.module('fli.look')
  .directive('fliLookContentInstagramMedia', function () {
    return {
      controller: 'look.content.instagram.media.ctrl',
      controllerAs: 'instaMedia',
      templateUrl: 'components/look/content/instagram/media/media.html'
    };

  });
