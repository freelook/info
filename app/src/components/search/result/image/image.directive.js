'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultImage', function () {
    return {
      controller: 'search.result.image.ctrl',
      controllerAs: 'image',
      templateUrl: 'components/search/result/image/image.html'
    };
  });

