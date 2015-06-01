'use strict';

angular
  .module('fli.look')
  .controller('look.content.ctrl',
  function ($rootScope, $scope, $sce, api, read, full, facebook) {

    $scope.html = '';

    $scope.share = function (url) {
      var href = 'http://freelook.info/look?url=' + url;
      return facebook.share(href);
    };

    function setContent(_content) {
      var content = _content || {};
      if (content.html) {
        $scope.html = full.get(content.html) || '';
      } else if (content.content) {
        $scope.html = full.get(content.content, content.title) || '';
      }
    }

    if ($rootScope.fli.route.url) {
      api.get($rootScope.fli.route.url)
        .success(setContent)
        .error(function () {
          read.call($rootScope.fli.route.url)
            .success(setContent);
        });
    }

  });


