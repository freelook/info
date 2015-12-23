'use strict';
angular
  .module('fli.search')
  .controller('search.chips.type.sub.url.ctrl',
  function ($scope, url, content, locale) {

    var site = content.site($scope.fli.route.url);

    function _init() {
      if ($scope.chips && $scope.fli.route.url) {
        $scope.chips.items.push({
          name: site.host,
          key: 'url',
          route: url.href('?', {
            l: locale.getCode(),
            input: $scope.fli.route.input,
            type: $scope.fli.route.type,
            sub: $scope.fli.route.sub
          }, false, '/')
        });
      }
    }

    _init();

  });
