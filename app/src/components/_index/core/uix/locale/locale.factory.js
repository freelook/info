'use strict';
angular
  .module('freelook.info')
  .factory('locale', function ($window, local, locales) {

    function init(value) {
      var storedLocaleCode = getCode(),
        navigatorLocaleCode = !!isRu() ? locales.ru.code : locales.en.code,
        locale = locales[value] || {},
        localeCode = locale.code || storedLocaleCode || navigatorLocaleCode;
      if (localeCode !== storedLocaleCode) {
        local.set('locale', localeCode);
      }
      return localeCode;
    }

    function get() {
      return locales[getCode()] || {};
    }

    function getCode() {
      return local.get('locale');
    }

    function getLng() {
      return get().lng || locales.en.lng;
    }

    function getPnCode() {
      return get().pn || locales.en.pn;
    }

    function getNedCodes() {
      return get().ned || locales.en.ned;
    }

    function isRu() {
      var navigatorLocale = $window.navigator.userLanguage || $window.navigator.language;
      return navigatorLocale.match(/ru/gi);
    }

    return {
      init: init,
      get: get,
      getCode: getCode,
      getLng: getLng,
      getPnCode: getPnCode,
      getNedCodes: getNedCodes,
      locales: locales
    };

  });


