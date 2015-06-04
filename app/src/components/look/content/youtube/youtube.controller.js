'use strict';

angular
  .module('fli.look')
  .controller('look.content.youtube.ctrl',
  function ($rootScope, $scope, youtube) {

    $scope.youtubeType = youtube.type($rootScope.fli.route.url);

  });


