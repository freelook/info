'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultPlacesFoursquare', function () {
    return {
      controller: 'search.result.places.foursquare.ctrl',
      controllerAs: 'foursquare',
      templateUrl: 'components/search/result/places/foursquare/foursquare.html'
    };
  });

