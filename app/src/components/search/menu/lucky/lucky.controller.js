'use strict';
angular
  .module('fli.search')
  .controller('search.lucky.ctrl',
  function ($scope, lucky, item) {

    var vm = this;

    vm.href = function () {
      return item.href({input: vm.word});
    };

    lucky.get().then(function (word) {
      vm.word = word;
    });

  });
