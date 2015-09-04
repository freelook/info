'use strict';

angular
  .module('fli.look')
  .controller('look.content.instagram.user.ctrl',
  function ($scope, $parse, instagram) {

    var vm = this;
    vm.item = '';

    if ($scope.insta.userName) {
      instagram
        .user($scope.fli.route.url)
        .then(function (item) {
          vm.item = $parse('data')(item) || '';
        });
    }

  });
