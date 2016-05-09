'use strict';
angular.module('fli.look')
  .directive('fliLookContentFacebookUser', function () {
    return {
      controller: 'look.content.facebook.user.ctrl',
      controllerAs: 'fbUser',
      templateUrl: 'components/look/content/facebook/user/user.html'
    };

  });
