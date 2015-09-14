'use strict';
angular
  .module('freelook.info')
  .factory('api', function (platform, apiSite, apiChrome) {

    var apiConnectors = {
      site: apiSite,
      chrome: apiChrome
    };

    return apiConnectors[platform.name()];

  });


