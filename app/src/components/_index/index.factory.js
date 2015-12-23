'use strict';
angular
  .module('freelook.info')
  .factory('index',
  function ($rootScope, $sce, $route, $routeParams, $timeout, $mdMedia, $translate, $location,
            user, url, I18N) {

    function init() {
      $rootScope.fli.title = !$routeParams.input ? $translate.instant(I18N.DEFAULT_TITLE) : decodeURIComponent($routeParams.input) + $translate.instant(I18N.FLI_POSTFIX);
      $rootScope.fli.description = !$routeParams.input ? $translate.instant(I18N.DEFAULT_DESCRIPTION) : $translate.instant(I18N.CUSTOM_DESCRIPTION) + decodeURIComponent($routeParams.input);
      $rootScope.fli.route = $routeParams || {};
      $rootScope.fli.media = $mdMedia;
      $rootScope.fli.view = '';
      $rootScope.fli.focus = 0;
      $rootScope.fli.user = user.current();
    }

    function go(params) {
      if (params) {
        switch (typeof params) {
          case 'string':
            if (params.substr(0, 4) === 'http') {
              return url.location(params);
            }
            return $timeout(function () {
              $location.url(params);
            });
          case 'object':
            return $route.updateParams(params);
        }
      }
    }

    function is(site, type) {
      if (site && type) {
        return (new RegExp(type)).test(site);
      }
      return false;
    }

    function href(localeCode) {
      return url.href('', {l: localeCode}, true);
    }

    function trust(src) {
      return $sce.trustAsResourceUrl(src);
    }

    function fix(_url) {
      var fixedUrl = url.decode(_url);
      return fixedUrl.substr(0, 2) === '//' ? 'http:' + fixedUrl : fixedUrl;
    }

    return {
      init: init,
      go: go,
      is: is,
      href: href,
      trust: trust,
      fix: fix
    };

  });


