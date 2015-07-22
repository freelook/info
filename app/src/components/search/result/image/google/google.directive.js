'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultImageGoogle', function () {
    return {
      controller: 'search.result.image.google.ctrl',
      controllerAs: 'imgGoogle',
      templateUrl: 'components/search/result/image/google/google.html'
    };
  });

