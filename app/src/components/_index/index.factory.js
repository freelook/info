'use strict';
angular
  .module('freelook.info')
  .factory('index',
  function ($rootScope, $sce, $routeParams, $mdMedia, $translate, url, nav, user, I18N) {

    function init() {
      $rootScope.fli.title = _buildTitle();
      $rootScope.fli.description = _buildDescription();
      $rootScope.fli.location = nav.location();
      $rootScope.fli.route = $routeParams || {};
      $rootScope.fli.media = $mdMedia;
      $rootScope.fli.view = '';
      $rootScope.fli.focus = 0;
      user.init();
    }

    function _buildTitle() {
      return !$routeParams.input ? $translate.instant(I18N.DEFAULT_TITLE) : decodeURIComponent($routeParams.input) + $translate.instant(I18N.FLI_POSTFIX);
    }

    function _buildDescription() {
      return !$routeParams.input ? $translate.instant(I18N.DEFAULT_DESCRIPTION) : $translate.instant(I18N.CUSTOM_DESCRIPTION) + decodeURIComponent($routeParams.input);
    }

    function reload() {
      return nav.reload();
    }

    function go(params) {
      return nav.go(params);
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
      reload: reload,
      go: go,
      is: is,
      href: href,
      trust: trust,
      fix: fix
    };

  });
