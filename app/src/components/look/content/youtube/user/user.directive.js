'use strict';
angular.module('fli.look')
  .directive('fliLookContentYoutubeUser', function () {
    return {
      replace: true,
      controller: 'look.content.youtube.user.ctrl',
      templateUrl: 'components/look/content/youtube/user/user.html'
    };
  });
