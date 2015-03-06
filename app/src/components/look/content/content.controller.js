'use strict';

angular
  .module('fli.look')
  .controller('look.content.ctrl',
  function ($rootScope, $scope, $sce, read) {

    if ($rootScope.fli.route.url) {

      read.get($rootScope.fli.route.url).then(function (html) {

        if (html && html.data) {
          $scope.html = $sce.trustAsHtml(html.data.content);

        }

      });
    }

  });


