'use strict';
angular.module('fli.look')
  .directive('fliLookContentRich', function () {
    return {
      controller: 'look.content.rich.ctrl',
      controllerAs: 'richCtrl',
      templateUrl: 'components/look/content/rich/rich.html'
    };

  });
