'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultImagesTwitter', function () {
    return {
      controller: 'search.result.web.images.twitter.ctrl',
      controllerAs: 'twitter',
      templateUrl: 'components/search/result/images/twitter/twitter.html'
    };
  });

