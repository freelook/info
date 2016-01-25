'use strict';

angular
  .module('fli.search')
  .controller('search.result.web.linkedin.ctrl',
  function ($scope, linkedin, item, lucky) {

    var vm = this;

    vm.link = linkedin.link;
    vm.href = item.href;
    vm.share = item.share;

    function setResult(posts) {
      vm.posts = posts || [];
    }

    linkedin
      .posts($scope.fli.route.input || lucky.word)
      .then(setResult);

  });

