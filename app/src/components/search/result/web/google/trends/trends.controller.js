'use strict';

angular
  .module('fli.search')
  .controller('search.result.web.google.trends.ctrl',
  function (hotTrends, item) {

    var vm = this,
      initCount = 3;
    vm.items = [];
    vm.share = item.share;
    vm.href = item.href;
    vm.search = item.search;

    function retry() {
      if (initCount > 0) {
        initCount--;
        init();
      }
    }

    function init() {
      hotTrends()
        .then(function (items) {
          if (items && items.length) {
            vm.items = items;
          } else {
            retry();
          }
        })
        .catch(retry);
    }


    init();

  });

