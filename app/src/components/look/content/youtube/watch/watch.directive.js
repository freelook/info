'use strict';
angular.module('fli.look')
  .directive('fliLookContentYoutubeWatch', function () {
    return {
      controller: 'look.content.youtube.watch.ctrl',
      controllerAs: 'watchCtrl',
      templateUrl: 'components/look/content/youtube/watch/watch.html'
    };
  });
