'use strict';
angular.module('fli.look')
  .directive('fliLookRich', function () {
    return {
      controller: 'rich.content.ctrl',
      templateUrl: 'components/look/rich/rich.html'
    };

  });
