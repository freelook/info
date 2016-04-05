'use strict';

angular
  .module('fli.search')
  .controller('search.result.people.instagram.ctrl',
  function ($scope, instagram) {

    var vm = this;

    vm.link = instagram.link;

    function setResult(response) {
      vm.people = response ? response.data : [];
    }

    instagram.people($scope.fli.route.input || '')
      .success(setResult);

  });

