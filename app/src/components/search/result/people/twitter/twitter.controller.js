'use strict';

angular
  .module('fli.search')
  .controller('search.result.web.people.twitter.ctrl',
  function ($scope, twitter, lucky) {

    var vm = this;
    vm.link = twitter.link;
    vm.search = [];

    function setResult(search) {
      vm.search = search || [];
    }

    twitter.people($scope.fli.route.input || lucky.word)
      .success(setResult);

  });

