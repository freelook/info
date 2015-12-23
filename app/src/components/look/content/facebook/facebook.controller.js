'use strict';

angular
  .module('fli.look')
  .controller('look.content.facebook.ctrl',
  function ($scope, facebook) {

    var vm = this;

    vm.img = facebook.img;

    facebook
      .user($scope.fli.route.url)
      .then(function (_usr) {
        vm.user = _usr || {};
      });

  });
