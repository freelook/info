'use strict';
angular
  .module('freelook.info')
  .factory('locale', function (local) {

    var locales = {
      en: null,
      ru: 'ru'
    };

    function init(value) {
      var lng = locales[value] || null;
      if (lng !== get()) {
        local.set('locale', lng);
      }
      return lng;
    }

    function get() {
      return local.get('locale', null);
    }

    return {
      init: init,
      get: get
    };

  });


