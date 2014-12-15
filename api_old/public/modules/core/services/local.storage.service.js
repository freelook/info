'use strict';
angular
    .module('core')
    .factory('LocalStorage',
    function ($window) {
        var LOCALE_KEY = 'NG_TRANSLATE_LANG_KEY';

        function _getItem(key, defaultValue, noParse) {
            var localStorageValue = noParse ?
                $window.localStorage.getItem(key) :
                JSON.parse($window.localStorage.getItem(key));

            if (!defaultValue) {
                defaultValue = null;
            }

            return (localStorageValue) ? localStorageValue : defaultValue;
        }

        function _setItem(key, value, noParse) {
            var localStorageValue = noParse ?
                value :
                JSON.stringify(value);
            $window.localStorage.setItem(key, localStorageValue);
        }

        function getLocale() {
            var lang = ($window.navigator.userLanguage || $window.navigator.language || 'EN_US').toLowerCase().split('-')[0];
            if (lang && lang !== 'ru') {
                lang = 'en';
            }

            return _getItem(LOCALE_KEY, lang, true);
        }

        function setLocale(lang) {
            _setItem(LOCALE_KEY, lang, true);
        }

        function getUser(socialName) {
            return _getItem(socialName);
        }

        function setUser(socialName, user) {
            _setItem(socialName, user);
        }

        return {
            getLocale: getLocale,
            setLocale: setLocale,
            getUser: getUser,
            setUser: setUser
        };
    });