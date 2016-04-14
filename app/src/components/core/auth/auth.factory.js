'use strict';
angular
  .module('freelook.info')
  .factory('auth', function (platform, authSite, authChrome) {

    var providers = {
      site: authSite,
      mobile: authSite,
      chrome: authChrome
    };

    return providers[platform.name()];

  });
