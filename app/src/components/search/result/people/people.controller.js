'use strict';

angular
  .module('fli.search')
  .controller('search.result.people.ctrl',
  function (item) {

    var vm = this;
    vm.href = item.href;

  });

