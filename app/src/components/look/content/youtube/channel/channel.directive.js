'use strict';
angular.module('fli.look')
  .directive('fliLookContentYoutubeChannel', function () {
    return {
      controller: 'look.content.youtube.channel.ctrl',
      controllerAs: 'ytbChannel',
      templateUrl: 'components/look/content/youtube/channel/channel.html'
    };
  });
