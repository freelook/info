'use strict';

angular
  .module('fli.look')
  .controller('look.content.vk.ctrl',
  function ($scope, vk, url) {

    var vm = this;
    vm.id = url.extract('/:id', $scope.site.pathname).id || '';

  });
