'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultPeopleInstagram', function () {
    return {
      controller: 'search.result.people.instagram.ctrl',
      controllerAs: 'instagram',
      templateUrl: 'components/search/result/people/instagram/instagram.html'
    };
  });

