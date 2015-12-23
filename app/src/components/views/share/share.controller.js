'use strict';

angular
  .module('freelook.info')
  .controller('share.ctrl',
  function ($scope, share) {

    var vm = this;

    share.run().then(function (link) {
      vm.link = link;
    });

  });

