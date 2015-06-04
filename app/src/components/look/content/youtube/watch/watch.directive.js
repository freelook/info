'use strict';
angular.module('fli.look')
  .directive('fliLookContentYoutubeWatch', function () {
    return {
      replace: true,
      controller: 'look.content.youtube.watch.ctrl',
      templateUrl: 'components/look/content/youtube/watch/watch.html'
    };
  });
