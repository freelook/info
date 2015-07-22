'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultImageInstagram', function () {
    return {
      controller: 'search.result.image.instagram.ctrl',
      controllerAs: 'imgInsta',
      templateUrl: 'components/search/result/image/instagram/instagram.html'
    };
  });

