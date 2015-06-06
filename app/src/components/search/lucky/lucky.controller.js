'use strict';
angular
  .module('fli.search')
  .controller('search.lucky.ctrl',
  function (google) {

    var vm = this;
    vm.lucky = 'freelook';

    google.random().success(function (lucky) {
      vm.lucky = lucky.word;
    });

  });
