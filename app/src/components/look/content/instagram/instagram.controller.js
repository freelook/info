'use strict';

angular
  .module('fli.look')
  .controller('look.content.instagram.ctrl',
  function ($scope, $parse, $location, instagram, url) {

    var vm = this,
      path = $scope.site.pathname || '';

    vm.userName = url.extract('/:id/', path).id || url.extract('/:id', path).id || '';
    vm.mediaCode = url.extract('/p/:id/', path).id || url.extract('/p/:id', path).id || '';

  });
