'use strict';
angular
  .module('freelook.info')
  .factory('nav', function ($location, $timeout, LINKS) {


    function go(_path) {
      $timeout(function () {
        $location.path(_path);
      });
    }

    function goHome() {
      go(LINKS.HOME);
    }


    return {
      go: go,
      goHome: goHome
    };

  })
  .constant('LINKS', {
    HOME: '/'
  });
