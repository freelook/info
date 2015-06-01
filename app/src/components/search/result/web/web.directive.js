'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultWeb', function () {
    return {
      replace: true,
      templateUrl: 'components/search/result/web/web.html'
    };
  });

