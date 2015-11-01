'use strict';
angular
  .module('freelook.info')
  .factory('auth', function (platform, authSite, authChrome) {

    var providers = {
      site: authSite,
      chrome: authChrome,
      noop: {
        logIn: angular.noop,
        logOut: angular.noop
      }
    };

    return providers[platform.name()] || providers.noop;

  });


