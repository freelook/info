(function () {
  'use strict';

  window.i18n.en.index = {};
  window.i18n.ru.index = {};

  angular
    .module('freelook.info')
    .controller('index.ctrl',
    function ($rootScope, index, url, locales, platform, CONFIG) {

      $rootScope.fli.filter = 1;
      $rootScope.fli.locales = locales;
      $rootScope.fli.platform = platform.name();
      $rootScope.fli.config = CONFIG;
      $rootScope.fli.fix = index.fix;

      $rootScope.link = url.link;
      $rootScope.location = url.location;
      $rootScope.decode = url.decode;
      $rootScope.go = index.go;
      $rootScope.is = index.is;
      $rootScope.href = index.href;
      $rootScope.trust = index.trust;

    })
    .constant('I18N', {
      DEFAULT_TITLE: 'index.title',
      DEFAULT_DESCRIPTION: 'index.description',
      CUSTOM_DESCRIPTION: 'index.customDescription',
      FLI_POSTFIX: 'index.fliPostfix'
    });

}());

