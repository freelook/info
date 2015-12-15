'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultImagesGoogle', function () {
    return {
      controller: 'search.result.images.google.ctrl',
      controllerAs: 'imgGoogle',
      templateUrl: 'components/search/result/images/google/google.html'
    };
  });

