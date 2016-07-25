'use strict';

angular
  .module('fli.profile')
  .controller('profile.input.ctrl',
    function ($routeParams, $scope, locale) {

      var vm = this;
      vm.placeholder = $routeParams.nickname || 'home.widget.user.bind';
      vm.label = 'home.widget.user.nickname';
      vm.icon = 'user';
      vm.action = 'user';

      vm.route = function () {
        return {
          l: locale.getCode(),
          input: $scope.fli.route.input || null
        };
      };

      vm.active = function () {
        return true;
      };

    });

