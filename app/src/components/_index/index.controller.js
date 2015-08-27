(function () {
  'use strict';

  window.i18n.en.index = {};
  window.i18n.ru.index = {};

  angular
    .module('freelook.info')
    .controller('index.ctrl',
    function ($rootScope, $route, $location, $translate, url, I18N) {

      $rootScope.fli = {};
      $rootScope.fli.view = '';
      $rootScope.fli.title = $translate.instant(I18N.DEFAULT_TITLE);
      $rootScope.fli.description = $translate.instant(I18N.DEFAULT_DESCRIPTION);

      $rootScope.link = url.link;
      $rootScope.location = url.location;
      $rootScope.decode = url.decode;

      $rootScope.go = function (params) {
        if (params) {
          switch (typeof params) {
            case 'string':
              return $location.url(params);
            case 'object':
              return $route.updateParams(params);
          }
        }
      };

      $rootScope.is = function (site, type) {
        if (site && type) {
          return (new RegExp(type)).test(site);
        }
        return false;
      };

      $rootScope.href = function (locale) {
        return url.href('', {lng: locale}, true);
      };

      $rootScope.fli.fix = function (_url) {
        var fixedUrl = url.decode(_url);
        return fixedUrl.substr(0, 2) === '//' ? 'http:' + fixedUrl : fixedUrl;
      };

    })
    .constant('I18N', {
      DEFAULT_TITLE: 'index.title',
      DEFAULT_DESCRIPTION: 'index.description',
      CUSTOM_DESCRIPTION: 'index.customDescription'
    });

}());

