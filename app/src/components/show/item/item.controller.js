'use strict';

angular
  .module('fli.show')
  .controller('show.item.ctrl',
  function ($scope, content) {

    $scope.site = content.site($scope.fli.route.input);

  });

