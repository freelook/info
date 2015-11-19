'use strict';
angular
  .module('freelook.info')
  .factory('toast', function ($mdToast, $translate) {

    var config = $mdToast.simple().position('top');

    function show(text) {
      config.content($translate.instant(text));
      $mdToast.show(config);
    }

    function error() {
      show('index.core.uix.toast.error');
    }

    return {
      show: show,
      error: error
    };

  });



