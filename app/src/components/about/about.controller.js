'use strict';

angular
  .module('fli.about')
  .controller('about.ctrl',
  function ($rootScope, $location, $routeParams, $mdMedia, $translate, locale, I18N) {

    $location.search({
      l: locale.init($routeParams.l)
    })
      .replace();

    var vm = this;
    $translate.use(locale.getLng());

    $rootScope.fli.route = $routeParams || {};
    $rootScope.fli.media = $mdMedia;
    $rootScope.fli.title = $translate.instant(I18N.DEFAULT_TITLE);
    $rootScope.fli.description = $translate.instant(I18N.DEFAULT_DESCRIPTION);
    $rootScope.fli.icon = 'heartbeat';
    $rootScope.fli.view = '';

    vm.cio = {
      img: 'https://graph.facebook.com/100002976489519/picture?type=large',
      link: 'https://ua.linkedin.com/in/kostrub'
    };

  });
