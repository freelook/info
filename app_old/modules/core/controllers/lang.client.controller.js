'use strict';
angular
    .module('core')
    .controller('LangController', function ($scope, $translate) {

        $scope.lang = $translate.use();
        $scope.setLang = function () {
            $translate.use($scope.lang);
        };
    });
