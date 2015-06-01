'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultImage', function () {
    return {
      replace: true,
      templateUrl: 'components/search/result/image/image.html'
    };
  });

