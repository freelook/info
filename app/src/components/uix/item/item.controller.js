'use strict';

angular
  .module('freelook.info')
  .controller('item.ctrl',
  function (index, item, content) {

    var vm = this;
    vm.fix = index.fix;
    vm.star = item.star;
    vm.site = function (_item) {
      return item.href({type: 'web', sub: vm.host(_item)});
    };
    vm.host = function (_item) {
      return content.site(_item.url).host;
    };

  });
