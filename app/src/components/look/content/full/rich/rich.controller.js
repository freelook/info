'use strict';

angular
  .module('fli.look')
  .controller('look.content.rich.ctrl',
  function ($scope, rich) {

    var vm = this;

    vm.subscribe = rich.subscribe;

    rich.get($scope.fli.route.url)
      .then(function (_item) {
        vm.item = _item;
      });

  });


