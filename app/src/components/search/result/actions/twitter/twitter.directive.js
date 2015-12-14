'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultActionsTwitter', function () {
    return {
      controller: 'search.result.web.actions.twitter.ctrl',
      controllerAs: 'twitter',
      templateUrl: 'components/search/result/actions/twitter/twitter.html'
    };
  });

