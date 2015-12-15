'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultImagesInstagram', function () {
    return {
      controller: 'search.result.images.instagram.ctrl',
      controllerAs: 'imgInsta',
      templateUrl: 'components/search/result/images/instagram/instagram.html'
    };
  });

