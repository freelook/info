'use strict';

angular
  .module('fli.look')
  .controller('look.content.facebook.ctrl',
  function ($scope, facebook, url) {

    var vm = this,
      path = $scope.site.pathname || '',
      id = url.extract('/:id', path).id || '';

    vm.id = id ? id : path.split('/').splice(1)[0];

    vm.img = function (id) {
      return 'https://graph.facebook.com/' + id + '/picture?type=large';
    };

    if (vm.id) {
      facebook
        .user(vm.id)
        .then(function (user) {
          vm.user = user || {};
        });
    }

  });
