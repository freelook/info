'use strict';

angular
  .module('fli.show')
  .controller('show.item.form.ctrl',
  function ($scope, nav, toast, storage) {

    var vm = this;

    vm.enable = function (item) {
      return item && item.url && item.title;
    };

    vm.star = function (item) {
      if (vm.enable(item)) {
        storage.arr.push(storage.keys.STAR_KEY, item);
        nav.goHome();
        toast.show('uix.item.stared', {v: item.title});
      }
    };

  });

