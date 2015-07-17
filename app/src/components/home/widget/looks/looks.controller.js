'use strict';

angular
  .module('fli.home')
  .controller('home.widget.looks.ctrl',
  function (local, url, LOOK_KEY) {

    var vm = this;
    vm.items = local.get(LOOK_KEY, []);

    vm.search = function (input) {
      return url.href('search?', {input: input})
    }

  });

