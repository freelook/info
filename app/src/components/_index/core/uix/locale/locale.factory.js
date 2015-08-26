'use strict';
angular
  .module('freelook.info')
  .factory('locale', function (local) {

    var locales = {
      en: 'en',
      ru: 'ru'
    };

    function init(value) {
      var locale = get(),
        lng = locales[value] || locale || locales.en;
      if (lng !== locale) {
        local.set('locale', lng);
      }
      return lng;
    }

    function get() {
      return local.get('locale');
    }

    return {
      init: init,
      get: get
    };

  });


