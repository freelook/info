'use strict';

angular
  .module('fli.search')
  .controller('search.result.people.facebook.ctrl',
  function ($scope, facebook, lucky) {

    var vm = this;

    vm.img = facebook.img;
    vm.link = facebook.link;

    function setResult(fb) {
      vm.people = fb.data || [];
    }

    facebook.people($scope.fli.route.input || lucky.word)
      .success(setResult);

  });

