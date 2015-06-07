'use strict';

angular
  .module('fli.search')
  .controller('search.result.ctrl',
  function ($scope, CONFIG, facebook) {

    var vm = this;

    vm.href = function (url) {
      return CONFIG.ORIGIN + 'look?input=' + $scope.fli.route.input + '&url=' + url;
    };

    vm.share = function (url, img, text) {
      var href = 'http://freelook.info/search?input=' + $scope.fli.route.input;
      if (img) {
        href += '&metaimg=' + img;
      }
      if (text) {
        href += '&metatext=' + text;
      }
      return facebook.share(href);
    };

  });

