'use strict';

angular
  .module('fli.look')
  .controller('look.content.facebook.wall.ctrl',
  function ($scope, facebook, item) {

    var vm = this;

    vm.href = item.href;

    facebook.wall($scope.fb.id)
      .then(function (res) {
        vm.data = !!res.data ? res.data.data : [];
      });

  });

