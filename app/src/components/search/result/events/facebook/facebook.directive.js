'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultEventsFacebook', function () {
    return {
      controller: 'search.result.events.facebook.ctrl',
      controllerAs: 'fb',
      templateUrl: 'components/search/result/events/facebook/facebook.html'
    };
  });

