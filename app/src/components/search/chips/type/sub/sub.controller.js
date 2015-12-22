'use strict';
angular
  .module('fli.search')
  .controller('search.chips.type.sub.ctrl',
  function ($scope, $location, url, content, locale) {

    var vm = this,
      site = content.site($scope.fli.route.url);

    vm.subs = {
      web: [
        {sub: 'google'},
        {sub: 'facebook'},
        {sub: 'vk'},
        {sub: 'pinterest'}
      ],
      people: [
        {sub: 'google'},
        {sub: 'facebook'},
        {sub: 'vk'},
        {sub: 'twitter'}
      ],
      news: [],
      actions: [
        {sub: 'twitter'},
        {sub: 'vk'}
      ],
      goods: [],
      images: [
        {sub: 'google'},
        {sub: 'instagram'},
        {sub: 'twitter'}
      ],
      audio: [],
      video: [
        {sub: 'youtube'},
        {sub: 'vk'}
      ],
      promo: []
    };

    function _init() {
      if ($scope.chips && $scope.fli.route.sub) {
        $scope.chips.items.push({
          name: $scope.fli.route.sub,
          key: 'sub',
          route: {
            sub: null
          }
        });
      }

      if ($scope.chips && $scope.fli.route.url) {
        $scope.chips.items.push({
          name: site.host,
          key: 'url',
          route: url.href('?', {
            l: locale.getCode(),
            input: $scope.fli.route.input,
            type: $scope.fli.route.type,
            sub: $scope.fli.route.sub
          }, false, '/')
        });
      }

    }

    function _config(sub) {
      return {
        l: locale.getCode(),
        input: $scope.fli.route.input,
        type: $scope.fli.route.type,
        sub: sub
      };
    }

    vm.href = function (sub) {
      return url.href('?', _config(sub));
    };

    vm.go = function (sub) {
      $scope.go({sub: sub});
    };

    _init();

  });
