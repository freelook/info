'use strict';
angular
  .module('fli.search')
  .controller('search.chips.type.sub.ctrl',
  function ($scope, $location, url, locale) {

    var vm = this;

    vm.subs = {
      web: [
        {sub: 'google'},
        {sub: 'facebook'},
        {sub: 'vk'}
      ],
      people: [
        {sub: 'google'},
        {sub: 'facebook'},
        {sub: 'vk'},
        {sub: 'twitter'}
      ],
      news: [],
      actions: [
        {sub: 'twitter'}
      ],
      goods: [],
      images: [
        {sub: 'google'},
        {sub: 'instagram'},
        {sub: 'twitter'}
      ],
      audio: [],
      video: [],
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
      return url.href('search?', _config(sub));
    };

    vm.go = function (sub) {
      $scope.go({sub: sub});
    };

    _init();

  });
