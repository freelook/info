'use strict';

angular
  .module('fli.show')
  .controller('show.input.ctrl',
  function ($rootScope) {

    var vm = this;
    vm.placeholder = 'show.input.placeholder';
    vm.type = 'url';
    vm.find = function () {
      $rootScope.fli.focus = 0;
    };

  });

