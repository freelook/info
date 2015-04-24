'use strict';

angular
  .module('fli.look')
  .controller('look.content.ctrl',
  function ($rootScope, $scope, $sce, boilerpipe, read) {

    function setHtml(html) {

      if (html) {
        if (html.response) {
          $scope.html = $sce.trustAsHtml(html.response.content);
        } else if (html.content) {
          $scope.html = $sce.trustAsHtml(html.content);
        } else if (typeof html === 'string') {
          $scope.html = $sce.trustAsHtml(html);
        }
      }
    }

    if ($rootScope.fli.route.url) {

      boilerpipe.get($rootScope.fli.route.url)
        .success(setHtml)
        .error(function () {
          read.get($rootScope.fli.route.url).success(setHtml);
        });
    }

  });


