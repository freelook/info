'use strict';

angular
  .module('fli.search')
  .controller('search.result.people.facebook.ctrl',
  function ($scope, facebook) {

    var vm = this;

    vm.img = facebook.img;
    vm.link = facebook.link;

    function setResult(fb) {
      vm.people = fb.data || [];
    }

    if ($scope.fli.route.input) {
      facebook.people($scope.fli.route.input)
        .success(setResult);
    }

  });

