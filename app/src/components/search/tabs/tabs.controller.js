'use strict';
angular
  .module('fli.search')
  .controller('search.tabs.ctrl',
  function ($scope, $location, url, locale) {

    var TYPES = {
      web: 0,
      news: 1,
      goods: 2,
      image: 3,
      audio: 4,
      video: 5,
      promo: 6
    };

    var vm = this, auto = false;
    vm.selected = -1;

    function _config(type) {
      return {
        l: locale.getCode(),
        input: $scope.fli.route.input,
        type: type,
        url: $scope.fli.route.url
      };
    }

    vm.href = function (type) {
      return url.href('search?', _config(type));
    };

    vm.go = function (type) {
      if (!auto) {
        var path = $location.path().slice(1) + '?';
        $scope.go(url.href(path, _config(type), false, '/'));
      } else {
        auto = false;
      }
    };

    function init() {
      var type = TYPES[$scope.fli.route.type || ''];
      if (angular.isUndefined(type)) {
        vm.selected = TYPES.web;
      } else {
        auto = true;
        vm.selected = type;
      }
    }

    init();

  });
