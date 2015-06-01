'use strict';
angular.module('fli.look')
  .directive('fliLookRich', function () {
    return {
      controller: 'look.rich.ctrl',
      templateUrl: 'components/look/rich/rich.html'
    };

  });
