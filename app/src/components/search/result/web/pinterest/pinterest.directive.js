'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultWebPinterest', function () {
    return {
      controller: 'search.result.web.pinterest.ctrl',
      controllerAs: 'pinterest',
      templateUrl: 'components/search/result/web/pinterest/pinterest.html'
    };
  });

