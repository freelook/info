'use strict';

angular
  .module('fli.look')
  .controller('look.content.vk.video.ctrl',
  function ($sce, $scope) {

    var vm = this;

    vm.watch = function () {
      return $sce.trustAsResourceUrl($scope.fli.route.url);
    };

  });



