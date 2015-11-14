'use strict';

angular
  .module('fli.show')
  .controller('show.item.form.ctrl',
  function ($scope) {

    var vm = this;

    vm.show = function () {
      console.log('Show item: ' + $scope.fli.route.input, $scope.showItem.post);
    };

  });

