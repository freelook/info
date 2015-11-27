'use strict';
angular
  .module('freelook.info')
  .factory('nav', function ($location, $timeout, LINKS) {

    function path(_path) {
      $location.path(_path);
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
