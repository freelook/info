'use strict';

angular
  .module('fli.look')
  .controller('look.content.vk.ctrl',
  function ($scope, vk, url) {

    var vm = this,
      path = $scope.site.pathname || '',
      vkObj = url.extract('/:id', path) || {};

    vm.id = vkObj.id ? vkObj.id : path.split('/').splice(1)[0];

  });
