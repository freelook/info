'use strict';

angular
  .module('fli.home')
  .controller('home.widget.trends.ctrl',
  function (hotTrends, item) {

    var vm = this,
      initCount = 3;
    vm.items = [];
    vm.share = item.share;

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

