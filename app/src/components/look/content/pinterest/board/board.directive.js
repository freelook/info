'use strict';
angular.module('fli.look')
  .directive('fliLookContentPinterestBoard', function () {
    return {
      controller: 'look.content.pinterest.board.ctrl',
      controllerAs: 'pintBoard',
      templateUrl: 'components/look/content/pinterest/board/board.html'
    };

  });
