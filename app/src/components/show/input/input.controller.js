'use strict';

angular
  .module('fli.show')
  .controller('show.input.ctrl',
  function ($scope, url, locale) {

    var vm = this;
    vm.placeholder = 'show.input.placeholder';
    vm.type = 'url';
    vm.find = function () {
      if ($scope.fli.route.input) {
        $scope.go(url.href('show?', {
          l: locale.getCode(),
          input: $scope.fli.route.input || ''
        }, false, '/'));
      }
    };

  });

