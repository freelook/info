'use strict';

angular
  .module('fli.look')
  .controller('look.content.pinterest.ctrl',
  function ($scope, url) {

    var vm = this;

    vm.pathname = $scope.site.pathname || '';
    vm.path = url.extract('/:user/:board/', vm.pathname) || {};

  });

