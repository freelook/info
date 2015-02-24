'use strict';

angular
  .module('fli.look')
  .controller('LookCtrl', function ($rootScope, $routeParams, $location, $scope, $sce) {

    $location.search({
      url: $routeParams.url,
      context: $routeParams.context,
      input: $routeParams.input,
      type: $routeParams.type || 'short'
    });

    $rootScope.fli.route = $routeParams || {};

    $scope.getFrameUrl = function() {
      return $sce.trustAsResourceUrl($rootScope.fli.route.url);
    };

  });
