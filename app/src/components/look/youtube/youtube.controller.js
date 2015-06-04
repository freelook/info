'use strict';

angular
    .module('fli.look')
    .controller('look.youtube.ctrl',
    function ($window, $scope, $rootScope, $sce, youtube,CONFIG) {

        $scope.type = youtube.define($rootScope.fli.route.url);

        $scope.videoEmbed = function () {
            return youtube.videoEmbed($rootScope.fli.route.url);
        };

        youtube.get($scope.type, $rootScope.fli.route.url).then(function (results) {
            $scope.results = results;
        });
        $scope.href = function (url) {
            return CONFIG.ORIGIN + 'look?input=' + $scope.fli.route.input + '&url=' + encodeURIComponent(url);
        };

        $scope.videoUrl = youtube.videoUrl;


    });


