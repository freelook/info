'use strict';

angular
  .module('fli.profile')
  .controller('profile.input.ctrl',
  function ($routeParams) {

    var vm = this;
    vm.placeholder = $routeParams.nickname || 'home.widget.user.bind';
    vm.label = 'home.widget.user.nickname';
    vm.disabled = true;
    vm.icon = 'user';
    vm.action = 'user';

    vm.active = function () {
      return true;
    };

  });

