'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultPeopleGoogle', function () {
    return {
      controller: 'search.result.people.google.ctrl',
      controllerAs: 'peopleGoogle',
      templateUrl: 'components/search/result/people/google/google.html'
    };
  });

