'use strict';

angular
  .module('fli.look')
  .controller('look.content.vk.group.ctrl',
  function ($scope, vk) {

    $scope.vk.group = '';

    vk.group($scope.vk.id)
      .then(function (data) {
        if (!data.error && data.data && data.data.response) {
          $scope.vk.group = data.data.response[0];
          $scope.vk.ownerId = -$scope.vk.group.gid;
        }
      });

  });

