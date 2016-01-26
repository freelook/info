'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultPeopleLinkedin', function () {
    return {
      controller: 'search.result.people.linkedin.ctrl',
      controllerAs: 'linkedin',
      templateUrl: 'components/search/result/people/linkedin/linkedin.html'
    };
  });

