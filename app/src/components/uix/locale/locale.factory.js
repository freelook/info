'use strict';
angular
  .module('freelook.info')
  .factory('locale', function ($window, storage, locales) {

    function init(value) {
      var storedLocaleCode = getCode(),
        navigatorLocaleCode = getNavigatorLocaleCode(),
        locale = locales[value] || {},
        localeCode = locale.code || storedLocaleCode || navigatorLocaleCode;
      if (localeCode !== storedLocaleCode) {
        storage.set('locale', localeCode);
      }
      return localeCode;
    }

    function get() {
      return locales[getCode()] || {};
    }

    function getCode() {
      return storage.get('locale');
    }

    function getLng() {
      return get().lng || locales.us.lng;
    }

    function getPnCode() {
      return get().pn || locales.us.pn;
    }

    function getNedCodes() {
      return get().ned || locales.us.ned;
    }

    function getNavigatorLocaleCode() {
      var navigatorLocale = $window.navigator.userLanguage || $window.navigator.language || '',
        navigatorLocales = navigatorLocale.split('-'),
        navigatorLocaleFirstCode = (navigatorLocales[0] || '').toLowerCase(),
        navigatorLocaleSecondCode = (navigatorLocales[1] || '').toLowerCase();
      return !!locales[navigatorLocaleFirstCode] ? navigatorLocaleFirstCode : !!locales[navigatorLocaleSecondCode] ? navigatorLocaleSecondCode : locales.us.code;
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


