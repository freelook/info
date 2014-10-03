'use strict';
angular
    .module('core')
    .controller('LangController', function ($scope, Localize, LocalStorage) {
        if (LocalStorage.getLocale() === 'en') {
            $scope.lang = 'English';
        } else {
            $scope.lang = 'Русский язык';
        }
        $scope.setLang = function (lang) {
            switch (lang) {
                case'Русский язык':
                    Localize.setLanguage('RU-RU');
                    break;
                default:
                    Localize.setLanguage('EN-US');
            }
            $scope.lang = lang;
            return $scope.lang;
        };
    });
