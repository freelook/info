'use strict';
angular
  .module('freelook.info')
  .factory('parser', function ($window) {

    var parser = new $window.DOMParser();

    return parser;

  });


