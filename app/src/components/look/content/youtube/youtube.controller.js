'use strict';

angular
  .module('fli.look')
  .controller('look.content.youtube.ctrl',
  function ($scope, youtube, CONFIG) {

    var vm = this;

    vm.href = function (url) {
      return CONFIG.ORIGIN + 'look?input=' + $scope.fli.route.input + '&url=' + url;
    };

    vm.watchUrl = youtube.watchUrl;

  });


