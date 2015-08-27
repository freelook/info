'use strict';

angular
  .module('fli.company')
  .controller('company.ctrl',
  function ($rootScope, $location, $routeParams, $mdMedia, $translate, locale, I18N) {

    $location.search({
      lng: locale.init($routeParams.lng)
    })
      .replace();

    var vm = this;
    $translate.use(locale.get());

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
