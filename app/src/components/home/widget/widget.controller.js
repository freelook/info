'use strict';

angular
  .module('fli.home')
  .controller('home.widget.ctrl',
  function (url) {

    var vm = this;

    vm.href = function (config) {
      return url.href('look?', {
        input: config.input,
        url: config.url,
        img: !!config.img ? encodeURIComponent(config.img) : null,
        text: config.text
      });
    };

    vm.search = function (input) {
      return url.href('search?', {input: input});
    };

  });

