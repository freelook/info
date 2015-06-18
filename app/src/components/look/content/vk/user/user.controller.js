'use strict';

angular
  .module('fli.look')
  .controller('look.content.vk.user.ctrl',
  function ($scope, vk) {

    $scope.vk.user = '';

    vk.user($scope.vk.id)
      .then(function (data) {
        if (!data.error && data.data && data.data.response) {
          $scope.vk.user = data.data.response[0];
          $scope.vk.ownerId = $scope.vk.user.uid;
        } else {
          $scope.vk.user = 'not';
        }
      });

  });

