'use strict';

angular
  .module('fli.look')
  .directive('fliLookContent', function () {
    return {
      controller: 'look.content.ctrl',
      controllerAs: 'content',
      templateUrl: 'components/look/content/content.html'
    };

  });
