'use strict';

angular
  .module('fli.look')
  .controller('look.content.instagram.ctrl',
  function ($scope, $parse, instagram, url) {

    var vm = this,
      path = $scope.site.pathname || '';

    vm.item = '';
    vm.id = url.extract('/p/:id/', path).id || url.extract('/p/:id', path).id || '';

    if (vm.id) {
      instagram
        .media(vm.id)
        .then(function (item) {
          vm.item = $parse('data.data')(item) || '';
        });
    }

  });
