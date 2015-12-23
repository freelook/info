'use strict';

angular
  .module('fli.search')
  .controller('search.result.web.facebook.ctrl',
  function ($scope, facebook) {

    var vm = this;

    vm.img = facebook.img;
    vm.link = facebook.link;

    function setResult(fb) {
      vm.results = fb.data || [];
    }

    facebook.pages($scope.fli.route.input || '')
      .success(setResult);

  });

