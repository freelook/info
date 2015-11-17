'use strict';
angular
  .module('freelook.info')
  .factory('index', function ($rootScope, $routeParams, $mdMedia, $translate, user, I18N) {

    function init() {
      $rootScope.fli.title = !$routeParams.input ? $translate.instant(I18N.DEFAULT_TITLE) : decodeURIComponent($routeParams.input) + $translate.instant(I18N.FLI_POSTFIX);
      $rootScope.fli.description = !$routeParams.input ? $translate.instant(I18N.DEFAULT_DESCRIPTION) : $translate.instant(I18N.CUSTOM_DESCRIPTION) + decodeURIComponent($routeParams.input);
      $rootScope.fli.route = $routeParams || {};
      $rootScope.fli.media = $mdMedia;
      $rootScope.fli.view = '';
      $rootScope.fli.focus = 0;

      var _usr = user.current();
      $rootScope.fli.user = _usr;
      if (_usr) {
        _usr.fetch().then(function () {
          $rootScope.fli.user = user.current();
        });
      }
    }

    return {
      init: init
    };

  });


