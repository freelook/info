'use strict';

angular
  .module('fli.look')
  .controller('look.content.full.ctrl',
  function ($scope, $sce, api, read, full, share, url) {

    $scope.html = '';

    $scope.share = function () {
      return share.url(url.href('look?', $scope.fli.route));
    };

    function setContent(_content) {
      var content = _content || {};
      if (typeof content === 'string') {
        $scope.html = full.get(content) || '';
      } else if (content.content) {
        $scope.html = full.get(content.content, content.title) || '';
      }
    }

    if ($scope.fli.route.url) {
      api.get($scope.fli.route.url)
        .success(setContent)
        .error(function () {
          read.call($scope.fli.route.url)
            .success(setContent);
        });
    }

  });


