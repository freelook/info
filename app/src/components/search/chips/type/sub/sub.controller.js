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
        {sub: 'vk'}
      ],
      news: [],
      goods: [],
      images: [
        {sub: 'google'},
        {sub: 'instagram'}
      ],
      audio: [],
      video: [],
      promo: []
    };

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

  });
