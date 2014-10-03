'use strict';
angular
    .module('core')
    .factory('LocalStorage',
    function ($window) {
        var LOCALE_KEY = 'locale';

        function _getItem(key, defaultValue) {
            var localStorageValue = JSON.parse($window.localStorage.getItem(key));

            if (defaultValue === undefined) {
                defaultValue = null;
            }

            return (localStorageValue !== null) ? localStorageValue : defaultValue;
        }

        function _setItem(key, value) {
            $window.localStorage.setItem(key, JSON.stringify(value));
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

        return {
            getLocale: getLocale,
            setLocale: setLocale
        };
    });