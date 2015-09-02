'use strict';

angular
  .module('fli.look')
  .controller('look.content.ctrl',
  function ($rootScope, $scope, content, SUPPORTED_SITES, RICH_SKIP) {

    var vm = this;

    $scope.site = content.site(decodeURIComponent($rootScope.fli.route.url)) || {};
    vm.supportedSites = SUPPORTED_SITES.join('|');
    vm.richSkip = RICH_SKIP.join('|');

  })
  .constant('SUPPORTED_SITES', ['youtube', 'vk', 'facebook', 'instagram'])
  .constant('RICH_SKIP', ['freelook', 'vk', 'facebook', 'instagram']);


