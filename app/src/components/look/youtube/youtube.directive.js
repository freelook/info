'use strict';
angular.module('fli.look')
  .directive('fliLookYoutube', function () {
    return {
      replace: true,
      controller: 'look.youtube.ctrl',
      templateUrl: 'components/look/youtube/youtube.html'
    };

  });
