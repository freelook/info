'use strict';
angular
    .module('core')
    .factory('LocalStorage',
    function ($window) {
        var LOCALE_KEY = 'NG_TRANSLATE_LANG_KEY';

        function _getItem(key, defaultValue) {
            var localStorageValue = $window.localStorage.getItem(key);

            if (!defaultValue) {
                defaultValue = null;
            }

            return (localStorageValue) ? localStorageValue : defaultValue;
        }

        function _setItem(key, value) {
            $window.localStorage.setItem(key, value);
        }

        function getLocale() {
            var lang = ($window.navigator.userLanguage || $window.navigator.language || 'EN_US').toLowerCase().split('-')[0];
            if (lang && lang !== 'ru') {
                lang = 'en';
            }

            return _getItem(LOCALE_KEY, lang);
        }

        function setLocale(lang) {
            _setItem(LOCALE_KEY, lang);
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