'use strict';
angular
  .module('fli.search')
  .controller('search.tabs.ctrl',
  function ($scope, url, locale) {

    var TYPES = {
      news: 1,
      goods: 2,
      image: 3,
      audio: 4,
      video: 5
    };

    var vm = this;
    vm.selected = -1;

    vm.href = function (type) {
      return url.href('search?', {l: locale.getCode(), input: $scope.fli.route.input, type: type});
    };

    vm.go = function (config) {
      $scope.go(config);
    };

    function init() {
      var type = $scope.fli.route.type || '';
      vm.selected = TYPES[type] || 0;
    }

    init();

  });
