'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultPeople', function () {
    return {
      controller: 'search.result.people.ctrl',
      controllerAs: 'people',
      templateUrl: 'components/search/result/people/people.html'
    };
  });

