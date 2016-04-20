'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultPlacesGoogle', function () {
    return {
      controller: 'search.result.places.google.ctrl',
      controllerAs: 'google',
      templateUrl: 'components/search/result/places/google/google.html'
    };
  });

