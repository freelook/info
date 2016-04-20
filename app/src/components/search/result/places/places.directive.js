'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultPlaces', function () {
    return {
      controller: 'search.result.places.ctrl',
      controllerAs: 'places',
      templateUrl: 'components/search/result/places/places.html'
    };
  });

