'use strict';
angular
  .module('freelook.info')
  .factory('localStorage', function ($window, platform) {
    return platform.name() !== 'chrome' ? $window.localStorage : null;
  });
