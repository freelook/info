'use strict';

angular
  .module('fli.look')
  .controller('look.content.instagram.media.ctrl',
  function ($scope, $parse, instagram) {

    var vm = this;
    vm.item = '';

    vm.link = function (code) {
      return instagram.link(['p', code].join('/'));
    };

    if ($scope.insta.mediaCode) {
      instagram
        .mediaByCode($scope.insta.mediaCode)
        .then(function (res) {
          vm.item = $parse('data.media')(res) || '';
        });
    }

  });
