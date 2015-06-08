'use strict';

angular
  .module('fli.look')
  .controller('look.content.facebook.ctrl',
  function ($scope, facebook, url) {

    var vm = this,
      path = $scope.site.pathname || '',
      id = url.extract('/:id', path).id || '';

    vm.id = id ? id : path.split('/').splice(1)[0];

    if (vm.id) {
      facebook
        .user(vm.id)
        .then(function (data) {
          var _usr = data[0] || {},
            _img = data[1] || {};

          vm.user = angular.extend(_usr.data, _img.data);

        });
    }

  });
