'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultEvents', function () {
    return {
      controller: 'search.result.events.ctrl',
      controllerAs: 'events',
      templateUrl: 'components/search/result/events/events.html'
    };
  });

