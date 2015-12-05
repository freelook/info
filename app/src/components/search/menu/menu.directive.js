'use strict';
angular
  .module('fli.search')
  .directive('fliSearchMenu',
  function () {
    return {
      templateUrl: 'components/search/menu/menu.html'
    };
  });
