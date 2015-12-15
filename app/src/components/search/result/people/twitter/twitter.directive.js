'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultPeopleTwitter', function () {
    return {
      controller: 'search.result.web.people.twitter.ctrl',
      controllerAs: 'twitter',
      templateUrl: 'components/search/result/people/twitter/twitter.html'
    };
  });

