'use strict';

angular
  .module('fli.share')
  .controller('share.ctrl',
  function ($rootScope, $window, $routeParams, $mdMedia, CONFIG, DEFAULT_TITLE, DEFAULT_DESCRIPTION) {

    if ($routeParams.url) {
      try {
        $window.location.href = $routeParams.url;
      } catch (e) {
        console.error(e);
        $rootScope.go('/').replace();
      }
    }

    $rootScope.fli.route = $routeParams || {};
    $rootScope.fli.media = $mdMedia;
    $rootScope.fli.title = DEFAULT_TITLE;
    $rootScope.fli.description = DEFAULT_DESCRIPTION;
    $rootScope.fli.icon = 'share-alt';

  });
