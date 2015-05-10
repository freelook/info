'use strict';
angular
  .module('freelook.info')
  .factory('toast', function ($mdToast) {

    var config = $mdToast.simple().position('bottom');

    function show(text) {
      config.content(text);
      $mdToast.show(config);
    }

    return {
      show: show
    };

  });



