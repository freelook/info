'use strict';
angular.module('fli.look')
  .directive('fliLookContentInstagramUser', function () {
    return {
      controller: 'look.content.instagram.user.ctrl',
      controllerAs: 'instaUser',
      templateUrl: 'components/look/content/instagram/user/user.html'
    };

  });
