'use strict';

angular
  .module('fli.look')
  .controller('look.content.youtube.ctrl',
  function ($scope, youtube, url) {

    var vm = this;

    vm.href = function (_url) {
      return url.href('look?', {input: $scope.fli.route.input, url: _url});
    };

    vm.watchUrl = youtube.watchUrl;

  });


