'use strict';

angular
  .module('fli.look')
  .controller('look.content.rich.ctrl',
  function ($routeParams, rich, look) {

    var vm = this;

    vm.subscribe = rich.subscribe;

    rich.get($routeParams.url)
      .then(function (_item) {
        vm.item = _item;
        look.add(_item);
      });

  });


