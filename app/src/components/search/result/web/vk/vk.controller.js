'use strict';

angular
  .module('fli.search')
  .controller('search.result.web.vk.ctrl',
  function ($scope, $sce, url, vk) {

    var vm = this;
    vm.search = {};

    function _getLink(id) {
      return 'https://vk.com/' + id;
    }

    function _getHref(id) {
      return url.href('look?', {input: $scope.fli.route.input, url: _getLink(id)});
    }

    vm.link = _getLink;
    vm.href = _getHref;

    function setResult(vk) {
      var result = vk.response || [];
      vm.results = angular.copy(result).splice(1);
    }

    if ($scope.fli.route.input) {
      vk.pages($scope.fli.route.input)
        .success(setResult);
    }

  });

