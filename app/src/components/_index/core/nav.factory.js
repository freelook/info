'use strict';
angular
  .module('freelook.info')
  .factory('nav', function ($location, $timeout, locale, LINKS) {

    function path(_path) {
      $location.path(_path)
        .search({l: locale.getLng()});
    }

    function go(_path) {
      $timeout(function () {
        path(_path);
      });
    }

    function goHome() {
      go(LINKS.HOME);
    }

    return {
      go: go,
      path: path,
      goHome: goHome
    };

  })
  .constant('LINKS', {
    HOME: '/'
  });
