'use strict';

angular
  .module('fli.look')
  .controller('look.content.ctrl',
  function ($rootScope, $scope, $location, content, SUPPORTED_SITES, RICH_SKIP) {

    var vm = this;

    $scope.site = content.site(decodeURIComponent($rootScope.fli.route.url)) || {};
    vm.supportedSites = SUPPORTED_SITES.join('|');
    vm.richSkip = RICH_SKIP.join('|');

    vm.href = function () {
      return $location.absUrl();
    };

  })
  .constant('SUPPORTED_SITES', ['youtube', 'vk', 'facebook', 'instagram', 'pinterest'])
  .constant('RICH_SKIP', ['freelook', 'vk', 'facebook', 'instagram', 'pinterest']);


