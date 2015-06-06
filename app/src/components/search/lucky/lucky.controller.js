'use strict';
angular
  .module('fli.search')
  .controller('search.lucky.ctrl',
  function ($scope, google, CONFIG) {

    var vm = this;
    vm.lucky = 'freelook';

    vm.href = function () {
      var href = CONFIG.ORIGIN + 'search?input=' + vm.lucky;
      if ($scope.fli.route.type) {
        href += '&type=' + $scope.fli.route.type;
      }
      return href;
    };

    google.random().success(function (lucky) {
      vm.lucky = lucky.word;
    });

  });
