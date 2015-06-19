'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultWebFacebook', function () {
    return {
      controller: 'search.result.web.facebook.ctrl',
      controllerAs: 'fb',
      templateUrl: 'components/search/result/web/facebook/facebook.html'
    };
  });

