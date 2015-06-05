'use strict';
angular.module('fli.look')
  .directive('fliLookContentYoutubeUser', function () {
    return {
      controller: 'look.content.youtube.user.ctrl',
      controllerAs: 'ytbUser',
      templateUrl: 'components/look/content/youtube/user/user.html'
    };
  });
