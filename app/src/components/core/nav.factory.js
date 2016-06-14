'use strict';
angular
  .module('freelook.info')
  .factory('nav', function ($location, $route, $timeout, locale, url, userLocalStorage, LINKS) {

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

    function path(_path) {
      if (_path) {
        return $location.path(_path)
          .search({l: locale.getCode()});
      }
      return $location.path();
    }

    function reload() {
      return $route.reload();
    }

    function goHome() {
      var nickname = userLocalStorage.getNickName();
      path(!!nickname ? '~/' + nickname : LINKS.HOME);
    }

    return {
      go: go,
      path: path,
      reload: reload,
      goHome: goHome
    };

  })
  .constant('LINKS', {
    HOME: '/'
  });
