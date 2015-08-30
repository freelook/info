'use strict';

angular
  .module('fli.home')
  .controller('home.widget.ctrl',
  function (url, item) {

    var vm = this;
    vm.search = item.search;

    vm.href = function (config) {
      return url.href('look?', {
        input: config.input,
        url: !!config.url ? encodeURIComponent(config.url) : '',
        img: !!config.img ? encodeURIComponent(config.img) : null
      });
    };

  });

