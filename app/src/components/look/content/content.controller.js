'use strict';

angular
  .module('fli.look')
  .controller('look.content.ctrl',
  function ($rootScope, $scope, $routeParams, $location, content, storage, LOOK_KEY, SUPPORTED_SITES, RICH_SKIP) {

    var vm = this;

    $scope.site = content.site(decodeURIComponent($rootScope.fli.route.url)) || {};
    vm.supportedSites = SUPPORTED_SITES.join('|');
    vm.richSkip = RICH_SKIP.join('|');

    vm.href = function () {
      return $location.absUrl();
    };

    if ($routeParams.input && $routeParams.url && $routeParams.img) {
      storage.arr.push(LOOK_KEY, {
        input: $routeParams.input,
        type: $routeParams.type,
        sub: $routeParams.sub,
        url: $routeParams.url,
        img: $routeParams.img
      }, 24);
    }


  })
  .constant('SUPPORTED_SITES', ['youtube', 'vk', 'facebook', 'instagram', 'pinterest'])
  .constant('RICH_SKIP', ['freelook', 'vk', 'facebook', 'instagram', 'pinterest']);


