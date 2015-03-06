'use strict';
angular.module('fli.look')
  .directive('fliLookContent', function () {
    return {
      controller: 'look.content.ctrl',
      templateUrl: 'components/look/content/content.html'
    };

  });
