'use strict';
angular
  .module('fli.look')
  .directive('fliLookContentPinterest', function () {
    return {
      controller: 'look.content.pinterest.ctrl',
      controllerAs: 'pinterest',
      templateUrl: 'components/look/content/pinterest/pinterest.html'
    };
  });

