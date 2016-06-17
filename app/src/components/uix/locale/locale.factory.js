'use strict';
angular
  .module('freelook.info')
  .factory('locale', function ($window, storage, locales) {

    function init(value) {
      return get(value).code || getNavigatorLocaleCode();
    }

    function validate(localeCode) {
      return localeCode && locales[localeCode];
    }

    function get(localeCode) {
      return validate(localeCode) || validate(getCode()) || locales.us;
    }

    function getCode() {
      return storage.get('locale', locales.us.code);
    }

    function setCode(localeCode) {
      storage.set('locale', get(localeCode).code);
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
      validate: validate,
      get: get,
      getCode: getCode,
      setCode: setCode,
      getLng: getLng,
      getPnCode: getPnCode,
      getNedCodes: getNedCodes,
      locales: locales
    };

  });


