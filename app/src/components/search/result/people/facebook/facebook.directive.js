'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultPeopleFacebook', function () {
    return {
      controller: 'search.result.people.facebook.ctrl',
      controllerAs: 'fb',
      templateUrl: 'components/search/result/people/facebook/facebook.html'
    };
  });

