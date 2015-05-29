'use strict';

angular
  .module('freelook.info')
  .controller('index.ctrl', function ($rootScope, $window, $route, $location, DEFAULT_TITLE, DEFAULT_DESCRIPTION) {

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

    $rootScope.link = function (href) {
      if (href) {
        $window.location.href = href;
      }
    };

  })
  .constant('DEFAULT_TITLE', 'FLI - free look at info')
  .constant('DEFAULT_DESCRIPTION', 'Your personal information manager. Just look what you need.');

