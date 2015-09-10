'use strict';
angular
  .module('freelook.info')
  .factory('google', function (platform, googleSite, googleChrome) {

    var googleConnectors = {
      site: googleSite,
      chrome: googleChrome
    };

    return googleConnectors[platform.name()];

  });
