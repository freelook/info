'use strict';
angular
  .module('freelook.info')
  .factory('auth', function (platform, authSite) {

    var authNoop = {
      logIn: angular.noop,
      logOut: angular.noop
    };

    return platform.name() === 'site' ? authSite : authNoop;

  });


