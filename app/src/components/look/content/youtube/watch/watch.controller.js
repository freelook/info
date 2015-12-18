'use strict';

angular
  .module('fli.look')
  .controller('look.content.youtube.watch.ctrl',
  function ($scope, youtube) {

    var vm = this;

    vm.watch = function () {
      return youtube.watch($scope.site);
    };

  });



