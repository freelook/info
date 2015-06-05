'use strict';
angular.module('fli.look')
  .directive('fliLookContentYoutube', function () {
    return {
      controller: 'look.content.youtube.ctrl',
      templateUrl: 'components/look/content/youtube/youtube.html'
    };

  });
