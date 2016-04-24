'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultPlacesGoogleMap', function () {
    return {
      controller: 'search.result.places.google.map.ctrl',
      controllerAs: 'mapCtrl',
      templateUrl: 'components/search/result/places/google/map/map.html'
    };
  });

