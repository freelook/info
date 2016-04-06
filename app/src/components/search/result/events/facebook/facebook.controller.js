'use strict';

angular
  .module('fli.search')
  .controller('search.result.events.facebook.ctrl',
  function ($scope, facebook) {

    var vm = this;

    vm.img = facebook.img;
    vm.link = facebook.link;

    function setResult(fb) {
      vm.results = fb ? fb.data : [];
    }

    facebook.events($scope.fli.route.input)
      .success(setResult);

  });

