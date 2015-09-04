'use strict';

angular
  .module('fli.look')
  .controller('look.content.facebook.ctrl',
  function ($scope, facebook) {

    var vm = this;

    vm.img = function (id) {
      return 'https://graph.facebook.com/' + id + '/picture?type=large';
    };

    if ($scope.fli.route.url) {
      facebook
        .user($scope.fli.route.url)
        .then(function (_usr) {
          vm.user = _usr || {};
        });
    }

  });
