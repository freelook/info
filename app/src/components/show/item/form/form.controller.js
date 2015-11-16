'use strict';

angular
  .module('fli.show')
  .controller('show.item.form.ctrl',
  function ($scope, SHOW) {

    var vm = this;

    vm.show = function () {
      SHOW.add($scope.showItem.post);
    };

  });

