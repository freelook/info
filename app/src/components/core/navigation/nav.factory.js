'use strict';
angular
  .module('fli.core')
  .factory('nav', function ($window, $location, $route, $timeout,
                            locale, userLocalStorage, LINKS) {

    function go(params) {
      if (params) {
        switch (typeof params) {
          case 'string':
            if (params.substr(0, 4) === 'http') {
              return location(params);
            }
            return $timeout(function () {
              url(params);
            });
          case 'object':
            return $route.updateParams(params);
        }
      }
    }

    function path(_path, _search, _hash) {
      if (_path) {
        return $location.path(_path)
          .search(_search || {l: locale.getCode()}).hash(_hash || '');
      }
      return $location.path();
    }

    function absUrl(_absUrl) {
      if (_absUrl) {
        return $location.absUrl(_absUrl);
      }
      return $location.absUrl();
    }

    function url(_url) {
      if (_url) {
        return $location.url(_url);
      }
      return $location.url();
    }

    function search(_search) {
      if (_search) {
        return $location.search(_search);
      }
      return $location.search();
    }

    function hash(_hash) {
      if (_hash || _hash === '') {
        return $location.hash(_hash);
      }
      return $location.hash();
    }

    function hashChange(_hash) {
      var location = $window.location;
      return [location.pathname, location.search, _hash ? '#' + _hash : ''].join('');
    }

    function reload() {
      return $route.reload();
    }

    function location(href) {
      if (href) {
        $window.location.href = href;
      }
    }

    function goHome() {
      path(LINKS.HOME);
    }

    function goAdd() {
      path(LINKS.ADD);
    }

    function goProfile(_nickname, _search, _hash) {
      var nickname = _nickname || userLocalStorage.getNickName();
      path([LINKS.PROFILE, nickname].join(''), _search, _hash);
    }

    function isProfile() {
      return ~path().indexOf(LINKS.PROFILE);
    }

    return {
      LINKS: LINKS,

      go: go,
      path: path,
      url: url,
      absUrl: absUrl,
      search: search,
      hash: hash,
      hashChange: hashChange,
      reload: reload,
      location: location,
      goHome: goHome,
      goAdd: goAdd,
      goProfile: goProfile,
      isProfile: isProfile
    };

  })
  .constant('LINKS', {
    HOME: '/',
    ADD: '/show',
    PROFILE: '/~/'
  });
