'use strict';
angular
  .module('fli.search')
  .directive('fliSearchSub',
  function () {
    return {
      controller: 'search.sub.ctrl',
      controllerAs: 'sub',
      templateUrl: 'components/search/sub/sub.html'
    };
  });
