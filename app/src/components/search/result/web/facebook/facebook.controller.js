'use strict';

angular
  .module('fli.search')
  .controller('search.result.web.facebook.ctrl',
  function ($scope, facebook, CONFIG) {

    var vm = this;
    vm.search = {};

    vm.img = function (id) {
      return 'https://graph.facebook.com/' + id + '/picture?type=large';
    };

    vm.link = function (id) {
      return 'https://www.facebook.com/' + id;
    };

    vm.href = function (id) {
      return CONFIG.ORIGIN + 'look?input=' + $scope.fli.route.input + '&url=' + vm.link(id);
    };

    function setResult(fb) {
      var results = fb.data || [];
      vm.results = angular.copy(results).splice(0, 24);
    }

    if ($scope.fli.route.input) {
      facebook.pages($scope.fli.route.input)
        .success(setResult);
    }

  });

