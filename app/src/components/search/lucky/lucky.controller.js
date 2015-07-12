'use strict';
angular
  .module('fli.search')
  .controller('search.lucky.ctrl',
  function ($scope, google, url) {

    var vm = this;
    vm.lucky = 'freelook';

    vm.href = function () {
      return url.href('search?', {input: vm.lucky}, true);
    };

    google.random().success(function (lucky) {
      vm.lucky = lucky.word;
    });

  });
