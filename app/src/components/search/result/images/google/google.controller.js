'use strict';

angular
  .module('fli.search')
  .controller('search.result.images.google.ctrl',
  function ($scope, google, lucky) {

    var vm = this;
    vm.search = {};

    function setResult(search) {
      vm.search = search || {};
    }

    google.image($scope.fli.route.input || lucky.word)
      .success(setResult);

  });

