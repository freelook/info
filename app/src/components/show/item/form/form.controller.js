'use strict';

angular
  .module('fli.show')
  .controller('show.item.form.ctrl',
  function (show, item, nav) {

    var vm = this;

    vm.enable = function (_item) {
      return _item && _item.url && _item.title;
    };

    vm.star = function (_item) {
      if (vm.enable(_item)) {
        show.clearInput();
        item.star(_item);
        nav.goHome();
      }
    };

  });

