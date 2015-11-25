'use strict';

angular
  .module('fli.look')
  .controller('look.content.rich.ctrl',
  function ($scope, rich) {

    var vm = this;

    if ($scope.fli.route.url) {
      rich.get($scope.fli.route.url)
        .then(function (_item) {
          vm.item = _item;
        });
    }

  });


