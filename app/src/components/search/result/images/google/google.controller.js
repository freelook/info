'use strict';

angular
  .module('fli.search')
  .controller('search.result.images.google.ctrl',
  function ($scope, google, lucky, BLACK_LIST) {

    var vm = this;
    vm.blackList = BLACK_LIST;

    function setResult(search) {
      vm.search = search || {};
    }

    google.image($scope.fli.route.input || lucky.word)
      .success(setResult);

  });

