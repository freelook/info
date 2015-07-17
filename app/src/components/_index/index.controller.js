'use strict';

angular
  .module('freelook.info')
  .controller('index.ctrl', function ($rootScope, $route, $location, DEFAULT_TITLE, DEFAULT_DESCRIPTION) {

    $rootScope.fli = {};
    $rootScope.fli.title = DEFAULT_TITLE;
    $rootScope.fli.description = DEFAULT_DESCRIPTION;

    $rootScope.go = function (params) {
      if (params) {
        switch (typeof params) {
          case 'string':
            $location.url(params);
            break;
          case 'object':
            $route.updateParams(params);
            break;
        }
      }
    };

    $rootScope.decode = function (_url) {
      return !!_url ? decodeURIComponent(_url) : '';
    };

    $rootScope.link = function (href, self) {
      if (href) {
        $('<a>').attr('href', href).attr('target', !self ? '_blank' : '')[0].click();
      }
    };

    $rootScope.is = function (site, type) {
      if (site && type) {
        return (new RegExp(type)).test(site);
      }
      return false;
    };

  })
  .constant('DEFAULT_TITLE', 'FLI - free look at info')
  .constant('DEFAULT_DESCRIPTION', 'Your personal information manager. Just look it');

