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
          .search({l: locale.getCode()}).hash('');
      }
      return $location.path();
    }

    function hash(_hash) {
      if (_hash || _hash === '') {
        return $location.hash(_hash);
      }
      return $location.hash();
    }

    function reload() {
      return $route.reload();
    }

    function goHome(_nickname) {
      var nickname = _nickname || userLocalStorage.getNickName();
      path(!!nickname ? '~/' + nickname : LINKS.HOME);
    }

    return {
      go: go,
      path: path,
      hash: hash,
      reload: reload,
      goHome: goHome
    };

  })
  .constant('LINKS', {
    HOME: '/'
  });
