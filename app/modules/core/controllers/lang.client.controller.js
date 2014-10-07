'use strict';
angular
    .module('core')
    .controller('LangController', function ($scope, Localize, LocalStorage) {
        if (LocalStorage.getLocale() === 'ru') {
            $scope.lang = 'ru';
        } else {
            $scope.lang = 'en';
        }
        $scope.setLang = function () {
            switch ($scope.lang) {
                case 'ru':
                    Localize.setLanguage('RU-RU');
                    break;
                default:
                    Localize.setLanguage('EN-US');
            }
        };
    });
