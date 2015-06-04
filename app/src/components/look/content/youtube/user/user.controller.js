'use strict';

angular
  .module('fli.look')
  .controller('look.content.youtube.user.ctrl',
  function ($rootScope, $scope, youtube, CONFIG) {

    youtube.user($rootScope.fli.route.url)
      .then(function (results) {
        $scope.results = results;
      });

    $scope.href = function (url) {
      return CONFIG.ORIGIN + 'look?input=' + $scope.fli.route.input + '&url=' + url;
    };

    $scope.videoUrl = youtube.videoUrl;

  });



