'use strict';

angular
  .module('fli.home')
  .controller('home.widget.ctrl',
  function ($scope, url) {

    var vm = this;

    vm.href = function (_url) {
      return url.href('look?', {input: $scope.fli.route.input, url: _url});
    };

  });

