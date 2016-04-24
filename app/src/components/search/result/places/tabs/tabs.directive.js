'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultPlacesTabs', function () {
    return {
      templateUrl: 'components/search/result/places/tabs/tabs.html'
    };
  });
