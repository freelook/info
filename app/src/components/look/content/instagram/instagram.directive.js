'use strict';
angular.module('fli.look')
  .directive('fliLookContentInstagram', function () {
    return {
      controller: 'look.content.instagram.ctrl',
      controllerAs: 'insta',
      templateUrl: 'components/look/content/instagram/instagram.html'
    };

  });
