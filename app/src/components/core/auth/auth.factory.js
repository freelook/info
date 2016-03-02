'use strict';
angular
  .module('freelook.info')
  .factory('auth', function (platform, authSite, authChrome) {

    var providers = {
      site: authSite,
      chrome: authChrome,
      noop: {
        logIn: angular.noop,
        logOut: angular.noop,
        data: {}
      }
    };

    return providers[platform.name()] || providers.noop;

  });
