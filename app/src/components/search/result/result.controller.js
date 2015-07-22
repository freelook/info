'use strict';

angular
  .module('fli.search')
  .controller('search.result.ctrl',
  function ($scope, url, facebook) {

    var vm = this;

    vm.href = function (config) {
      return url.href('look?', {
        input: $scope.fli.route.input,
        url: encodeURIComponent(config.url),
        img: encodeURIComponent(config.img),
        text: config.text
      });
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

