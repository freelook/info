'use strict';
angular
  .module('freelook.info')
  .factory('api', function (platform, apiSite, apiApp) {

    var apiConnectors = {
      site: apiSite,
      chrome: apiApp,
      mobile: apiApp
    };

    return apiConnectors[platform.name()];

  });


