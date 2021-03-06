'use strict';

angular
  .module('fli.look')
  .controller('look.content.full.ctrl',
  function ($scope, api, readability, full, item, nav, url) {

    var vm = this;
    vm.article = null;
    vm.type = nav.hash();

    vm.share = item.share;
    vm.hashChange = url.hash;

    function setData(data) {
      if (typeof data === 'string') {
        vm.article = full.get($scope.fli.route.url, data);
      } else if (data.content) {
        vm.article = full.get($scope.fli.route.url, data.content);
      }
    }

    api.get($scope.fli.route.url)
      .success(setData)
      .error(function () {
        readability.read($scope.fli.route.url)
          .success(setData);
      });

  });


