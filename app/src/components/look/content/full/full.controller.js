'use strict';

angular
  .module('fli.look')
  .controller('look.content.full.ctrl',
  function ($scope, $sce, $compile, api, read, full, share, url, CONFIG) {

    var vm = this;
    vm.html = '';

    vm.share = function () {
      return share.url(url.href('look?', $scope.fli.route, false, CONFIG.PRODUCTION));
    };

    function _trustCompile(html) {
      var compiledHtml = $compile(html)($scope)[0] || {};
      return $sce.trustAsHtml(compiledHtml.outerHTML) || '';
    }

    function setContent(_content) {
      var content = _content || {};
      if (typeof content === 'string') {
        vm.html = _trustCompile(full.get(content));
      } else if (content.content) {
        vm.html = _trustCompile(full.get(content.content, content.title));
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


