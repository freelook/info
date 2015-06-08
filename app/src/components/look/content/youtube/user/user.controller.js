'use strict';

angular
  .module('fli.look')
  .controller('look.content.youtube.user.ctrl',
  function ($rootScope, $scope, youtube, CONFIG, url) {

    var vm = this;

    vm.userId = url.extract('/user/:id', $scope.site.pathname).id;

    if (vm.userId) {
      youtube
        .user(vm.userId)
        .then(function (results) {
          vm.results = results;
        });
    }

  });



