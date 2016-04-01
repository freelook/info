'use strict';

angular
  .module('fli.look')
  .controller('look.content.ctrl',
  function ($rootScope, $scope, $routeParams, $location, content, look, SUPPORTED_SITES) {

    var vm = this;

    $scope.site = content.site($rootScope.fli.route.url) || {};
    vm.supportedSites = SUPPORTED_SITES.join('|');

    vm.href = function () {
      return $location.absUrl();
    };

    look.add($routeParams);

  })
  .constant('SUPPORTED_SITES', ['freelook', 'youtube', 'vk', 'facebook', 'instagram', 'pinterest']);


