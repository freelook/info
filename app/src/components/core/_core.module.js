(function () {
  'use strict';

  window.i18n.ru.core = {};
  window.i18n.en.core = {};

  angular
    .module('fli.core', [
      'ngAnimate', 'ngTouch', 'ngSanitize', 'ngCookies', 'ngRoute', 'ngMaterial',
      'pascalprecht.translate', 'angular-cache', 'mediaPlayer', 'firebase'
    ]);

}());
