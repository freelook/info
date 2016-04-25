'use strict';

angular
  .module('fli.search')
  .controller('search.result.job.ctrl',
  function () {

    var vm = this;

    vm.href = function (_item) {
      return _item.url;
    };

  });

