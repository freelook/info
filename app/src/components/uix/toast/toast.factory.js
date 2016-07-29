'use strict';
angular
  .module('freelook.info')
  .factory('toast', function ($mdToast, $translate, scroll) {

    var config = $mdToast.simple().position('top');

    function show(key, params) {
      if (typeof key === 'string') {
        config.content($translate.instant(key, params));
      } else {
        config = key;
      }
      scroll.top();
      $mdToast.show(config);
    }

    function hide() {
      $mdToast.hide();
    }

    function routeChangeSuccess() {
      hide();
    }

    function error() {
      show('uix.toast.error');
    }

    function needLogin() {
      show('index.input.note.needLogin');
    }

    function useApps() {
      show({
        hideDelay: 0,
        position: 'top',
        template: '<fli-apps-toast></fli-apps-toast>'
      });
    }

    return {
      show: show,
      hide: hide,
      routeChangeSuccess: routeChangeSuccess,
      error: error,
      needLogin: needLogin,
      useApps: useApps
    };

  });



