'use strict';

angular
  .module('fli.look')
  .controller('look.content.vk.wall.ctrl',
  function ($scope, vk) {

    var vm = this;

    vk.wall($scope.vk.ownerId)
      .then(function (data) {
        if (data && !data.error && data.data && data.data.response) {
          vm.results = data.data.response;
        }
      });

  });

