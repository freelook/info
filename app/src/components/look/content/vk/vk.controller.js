'use strict';

angular
  .module('fli.look')
  .controller('look.content.vk.ctrl',
  function ($scope, vk, url) {

    var vm = this,
      path = $scope.site.pathname || '',
      id = url.extract('/:id', path).id || '';

    vm.id = id ? id : path.split('/').splice(1)[0];

  });
