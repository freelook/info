'use strict';
angular
  .module('freelook.info')
  .factory('toast', function ($mdToast, $translate, scroll) {

    var config = $mdToast.simple().position('top');

    function show(key, params) {
      config.content($translate.instant(key, params));
      scroll.top();
      $mdToast.show(config);
    }

    function error() {
      show('uix.toast.error');
    }

    function needLogin() {
      show('index.input.note.needLogin');
    }

    return {
      show: show,
      error: error,
      needLogin: needLogin
    };

  });



