'use strict';

angular
  .module('fli.look')
  .controller('look.content.ctrl',
  function ($rootScope, $scope, content) {

    $scope.site = content.site(decodeURIComponent($rootScope.fli.route.url)) || {};

  });


