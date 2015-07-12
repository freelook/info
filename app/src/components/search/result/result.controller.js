'use strict';

angular
  .module('fli.search')
  .controller('search.result.ctrl',
  function ($scope, url, facebook) {

    var vm = this;

    vm.href = function (_url) {
      return url.href('look?', {input: $scope.fli.route.input, url: _url});
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

