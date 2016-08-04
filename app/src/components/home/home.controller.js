'use strict';

angular
  .module('fli.home')
  .controller('home.ctrl',
  function ($rootScope, $routeParams, $location, $scope, $translate, index, locale) {

    $location.search({
      l: locale.init($routeParams.l),
      input: $routeParams.input || null,
      type: $routeParams.type || null,
      order: $routeParams.order || null,
      p: $routeParams.p || null,
      sub: $routeParams.sub || null,
      url: $routeParams.url || null,
      img: $routeParams.img || null,
      amp: $routeParams.amp || null
    })
      .replace();

    $translate.use(locale.getLng());
    $rootScope.fli.icon = 'eye-slash';
    index.init({amp: true});

    var vm = this;

    vm.isHome = function () {
      return !($routeParams.type || $routeParams.sub || $routeParams.url);
    };

    vm.isSearch = function () {
      return $routeParams.type && !$routeParams.url;
    };

    vm.isLook = function () {
      return $routeParams.url;
    };

    vm.hasType = function () {
      return $routeParams.type;
    };

  });
