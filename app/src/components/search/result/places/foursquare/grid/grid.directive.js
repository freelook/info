'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultPlacesFoursquareGrid', function () {
    return {
      templateUrl: 'components/search/result/places/foursquare/grid/grid.html'
    };
  });

