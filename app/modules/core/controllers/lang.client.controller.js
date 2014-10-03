'use strict';
angular
    .module('core')
    .controller('LangController', ['$scope', 'localize', function ($scope, localize) {
        return $scope.lang = 'English', $scope.setLang = function (lang) {
            switch (lang) {
                case'Русский язык':
                    localize.setLanguage('RU-RU');
                    break;
                default:
                    localize.setLanguage('EN-US');
            }
            $scope.lang = lang;
            return $scope.lang;
        };
    }]);
