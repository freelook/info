'use strict';
angular
  .module('freelook.info')
  .factory('nav', function ($location, locale, LINKS) {


    function go(_path) {
      $location.path(_path)
        .search({l: locale.getCode()});
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
