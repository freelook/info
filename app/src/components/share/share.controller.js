'use strict';

angular
  .module('fli.share')
  .controller('share.ctrl',
  function ($rootScope, $location, $routeParams, $mdMedia, DEFAULT_TITLE, DEFAULT_DESCRIPTION) {

    if ($routeParams.url) {
      $location.url(decodeURIComponent($routeParams.url)).replace();
    }

    $rootScope.fli.route = $routeParams || {};
    $rootScope.fli.media = $mdMedia;
    $rootScope.fli.title = DEFAULT_TITLE;
    $rootScope.fli.description = DEFAULT_DESCRIPTION;
    $rootScope.fli.icon = 'share-alt';

  });
