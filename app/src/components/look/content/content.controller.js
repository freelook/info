'use strict';

angular
  .module('fli.look')
  .controller('look.content.ctrl',
  function ($scope, $routeParams, nav, content, CONFIG, SUPPORTED_SITES) {

    var vm = this;

    $scope.site = content.site($routeParams.url) || {};
    vm.supportedSites = SUPPORTED_SITES.join('|');

    vm.href = function () {
      return nav.absUrl();
    };

  })
  .constant('SUPPORTED_SITES', ['freelook', 'youtube', 'vk', 'facebook', 'instagram', 'pinterest']);


