'use strict';

angular
  .module('fli.look')
  .controller('look.content.youtube.ctrl',
  function ($scope, youtube, item) {

    var vm = this;

    vm.href = item.href;
    vm.watchUrl = youtube.watchUrl;

  });


