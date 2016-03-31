'use strict';

angular
  .module('freelook.info')
  .controller('item.ctrl',
  function (index, item, content) {

    var vm = this;
    vm.fix = index.fix;
    vm.star = item.star;
    vm.url = function (_url) {
      return content.site(_url).host;
    };


  });
