'use strict';

angular
  .module('freelook.info')
  .controller('item.ctrl',
  function ($routeParams, index, url, item, content, CONFIG) {

    var vm = this;

    vm.limitTo = 300;
    vm.fix = index.fix;
    vm.decode = url.decode;
    vm.star = item.star;

    vm.site = function (_item) {
      return item.href({type: 'web', sub: vm.host(_item)});
    };

    vm.host = function (_item) {
      var host = $routeParams.sub || '';
      if (_item.url) {
        var urlHost = content.site(_item.url).host;
        if (!index.is(CONFIG.PRODUCTION, urlHost)) {
          host = urlHost;
        } else if (_item.img) {
          var imgHost = content.site(_item.img).host;
          if (!index.is(CONFIG.PRODUCTION, imgHost)) {
            host = imgHost;
          }
        }
      }
      return host;
    };

  });
