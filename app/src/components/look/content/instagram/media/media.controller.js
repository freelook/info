'use strict';

angular
  .module('fli.look')
  .controller('look.content.instagram.media.ctrl',
  function ($scope, $parse, instagram) {

    var vm = this;
    vm.item = '';

    if ($scope.insta.mediaCode) {
      instagram
        .media($scope.insta.mediaCode)
        .then(function (item) {
          vm.item = $parse('data.data')(item) || '';
        });
    }

  });
