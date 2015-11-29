(function () {
  'use strict';

  window.i18n.en.index = {};
  window.i18n.ru.index = {};

  angular
    .module('freelook.info')
    .controller('index.ctrl',
    function ($rootScope, $route, $location, $translate, $sce, url, locales, platform, CONFIG) {

      $rootScope.fli.filter = 1;
      $rootScope.fli.locales = locales;
      $rootScope.fli.platform = platform.name();
      $rootScope.fli.config = CONFIG;
      $rootScope.link = url.link;
      $rootScope.location = url.location;
      $rootScope.decode = url.decode;

      $rootScope.go = function (params) {
        if (params) {
          switch (typeof params) {
            case 'string':
              if (params.substr(0, 4) === 'http') {
                return url.location(params);
              }
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

      $rootScope.href = function (localeCode) {
        return url.href('', {l: localeCode}, true);
      };

      $rootScope.trust = function (src) {
        return $sce.trustAsResourceUrl(src);
      };

      $rootScope.fli.fix = function (_url) {
        var fixedUrl = url.decode(_url);
        return fixedUrl.substr(0, 2) === '//' ? 'http:' + fixedUrl : fixedUrl;
      };

    })
    .constant('I18N', {
      DEFAULT_TITLE: 'index.title',
      DEFAULT_DESCRIPTION: 'index.description',
      CUSTOM_DESCRIPTION: 'index.customDescription',
      FLI_POSTFIX: 'index.fliPostfix'
    });

}());

