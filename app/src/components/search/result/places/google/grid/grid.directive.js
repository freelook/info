'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultPlacesGoogleGrid', function () {
    return {
      templateUrl: 'components/search/result/places/google/grid/grid.html'
    };
  });

