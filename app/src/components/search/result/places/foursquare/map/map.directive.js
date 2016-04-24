'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultPlacesFoursquareMap', function () {
    return {
      controller: 'search.result.places.foursquare.map.ctrl',
      controllerAs: 'mapCtrl',
      templateUrl: 'components/search/result/places/foursquare/map/map.html'
    };
  });

