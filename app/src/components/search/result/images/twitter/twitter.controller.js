'use strict';

angular
  .module('fli.search')
  .controller('search.result.web.images.twitter.ctrl',
  function ($scope, $parse, twitter, lucky) {

    var vm = this;
    vm.link = twitter.link;
    vm.search = [];

    function setResult(search) {
      vm.search = $parse('statuses')(search) || [];
    }

    twitter.images($scope.fli.route.input || lucky.word)
      .success(setResult);

  });

