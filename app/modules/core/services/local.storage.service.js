'use strict';
angular
    .module('core')
    .factory('LocalStorage',
    function ($window) {
        var LOCALE_KEY = 'locale',
            VK_KEY = 'vk';

        function _getItem(key, defaultValue) {
            var localStorageValue = JSON.parse($window.localStorage.getItem(key));

            if (!defaultValue) {
                defaultValue = null;
            }

            return (localStorageValue) ? localStorageValue : defaultValue;
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

        function getVK() {
            return _getItem(VK_KEY);
        }

        function setVK(vk) {
            _setItem(VK_KEY, vk);
        }

        return {
            getLocale: getLocale,
            setLocale: setLocale,
            getVK: getVK,
            setVK: setVK
        };
    });