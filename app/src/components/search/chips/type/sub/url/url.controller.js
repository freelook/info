'use strict';
angular
  .module('fli.search')
  .controller('search.chips.type.sub.url.ctrl',
  function ($scope, url, content, index, locale) {

    function _name() {
      var site = content.site($scope.fli.route.url);
      if (index.is(site.host, $scope.fli.route.sub)) {
        return url.extract('(/):id(\\.:temp)(/*)', site.pathname || '').id || site.host;
      }

      return site.host;
    }

    function _init() {

      if ($scope.chips && $scope.fli.route.url) {
        $scope.chips.items.push({
          name: _name(),
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
