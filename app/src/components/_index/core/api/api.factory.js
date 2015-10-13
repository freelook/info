'use strict';
angular
  .module('freelook.info')
  .factory('api', function (platform, apiSite, apiChrome) {

    var apiConnectors = {
      site: apiSite,
      chrome: apiChrome,
      mobile: apiChrome
    };

    return apiConnectors[platform.name()];

  });


