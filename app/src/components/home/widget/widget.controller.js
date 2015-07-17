'use strict';

angular
  .module('fli.home')
  .controller('home.widget.ctrl',
  function ($scope, url) {

    var vm = this;

    vm.href = function (config) {
      return url.href('look?', {
        input: $scope.fli.route.input,
        url: config.url,
        img: config.img,
        text: config.text
      });
    };

  });

