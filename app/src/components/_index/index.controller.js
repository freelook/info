'use strict';

angular
  .module('freelook.info')
  .controller('index.ctrl', function ($rootScope, $route, $location, url, DEFAULT_TITLE, DEFAULT_DESCRIPTION) {

    $rootScope.fli = {};
    $rootScope.fli.title = DEFAULT_TITLE;
    $rootScope.fli.description = DEFAULT_DESCRIPTION;

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

    $rootScope.fli.fix = function (_url) {
      var fixedUrl = url.decode(_url);
      return fixedUrl.substr(0, 2) === '//' ? 'http:' + fixedUrl : fixedUrl;
    };

  })
  .constant('DEFAULT_TITLE', 'FLI - free look at info')
  .constant('DEFAULT_DESCRIPTION', 'Your personal information manager. Just look it');

