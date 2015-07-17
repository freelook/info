'use strict';

angular
  .module('fli.search')
  .controller('search.result.ctrl',
  function ($scope, url, facebook, local, LOOK_KEY) {

    var vm = this;

    vm.href = function (_url) {
      return url.href('look?', {input: $scope.fli.route.input, url: _url});
    };

    vm.look = function (item) {
      local.push(LOOK_KEY, {
        img: item.img || '',
        url: item.url || '',
        title: item.title || '',
        input: $scope.fli.route.input || '',
        type: $scope.fli.route.type || '',
        sub: $scope.fli.route.sub || ''
      }, 12);
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

