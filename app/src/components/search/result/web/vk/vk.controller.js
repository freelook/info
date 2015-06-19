'use strict';

angular
  .module('fli.search')
  .controller('search.result.web.vk.ctrl',
  function ($scope, $sce, CONFIG, vk) {

    var vm = this;
    vm.search = {};

    function _getLink(id) {
      return 'https://vk.com/' + id;
    }

    function _getUrl(id) {
      return CONFIG.ORIGIN + 'look?input=' + $scope.fli.route.input + '&url=' + _getLink(id);
    }

    vm.link = function (id) {
      return _getLink(id);
    };

    vm.href = function (id) {
      return _getUrl(id);
    };

    function setResult(vk) {
      var result = vk.response || [];
      vm.results = angular.copy(result).splice(1);
    }

    if ($scope.fli.route.input) {
      vk.pages($scope.fli.route.input)
        .success(setResult);
    }

  });

