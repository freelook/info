'use strict';

angular
    .module('fli.look')
    .controller('look.youtube.ctrl',
    function ($window, $scope, $rootScope, $sce, youtube) {

        $scope.type = '';
        $scope.results = [];
        function init() {
            $scope.type = youtube.define($rootScope.fli.route.url);

            alert($scope.type);

            $scope.video = function () {
                return youtube.video($rootScope.fli.route.url);
            };

            $scope.results = youtube.get($scope.type);
        }

        init();


    });


