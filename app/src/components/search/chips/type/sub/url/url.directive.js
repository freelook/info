'use strict';
angular
  .module('fli.search')
  .directive('fliSearchChipsTypeSubUrl',
  function () {
    return {
      controller: 'search.chips.type.sub.url.ctrl'
    };
  });
