'use strict';

angular
  .module('fli.search')
  .controller('search.result.web.facebook.ctrl',
  function ($scope, facebook) {

    var vm = this;
    vm.search = {};

    vm.img = function (id) {
      return 'https://graph.facebook.com/' + id + '/picture?type=large';
    };

    vm.link = function (_id) {
      var id = _id || '';
      return 'https://www.facebook.com/' + id;
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

