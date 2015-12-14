'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultActions', function () {
    return {
      controller: 'search.result.actions.ctrl',
      controllerAs: 'actions',
      templateUrl: 'components/search/result/actions/actions.html'
    };
  });

