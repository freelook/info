'use strict';
angular
  .module('freelook.info')
  .factory('locale', function ($window, storage, locales) {

    function init(value) {
      return get(value).code;
    }

    function validate(localeCode) {
      return localeCode && locales[localeCode];
    }

    function get(localeCode) {
      return validate(localeCode) || validate(getStoredCode()) || getNavigatorLocale();
    }

    function getCode() {
      return init();
    }

    function setCode(localeCode) {
      storage.set('locale', init(localeCode));
    }

    function getStoredCode() {
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

    function getNavigatorLocale() {
      var navigatorLocale = $window.navigator.userLanguage || $window.navigator.language || '',
        navigatorLocales = navigatorLocale.split('-'),
        navigatorLocaleFirstCode = (navigatorLocales[0] || '').toLowerCase(),
        navigatorLocaleSecondCode = (navigatorLocales[1] || '').toLowerCase();
      return validate(navigatorLocaleFirstCode) || validate(navigatorLocaleSecondCode) || locales.us;
    }

    return {
      init: init,
      validate: validate,
      get: get,
      getCode: getCode,
      setCode: setCode,
      getStoredCode: getStoredCode,
      getLng: getLng,
      getPnCode: getPnCode,
      getNedCodes: getNedCodes,
      locales: locales
    };

  });


