'use strict';
angular
  .module('freelook.info')
  .factory('share', function ($rootScope, facebook, google, vk, url, CONFIG) {

    var _href = '', _item = {},
      connectors = {
        facebook: facebook.share,
        vk: vk.share
      };

    function _url(href, item) {
      if (href) {
        _href = href;
        _item = item || {};
        $rootScope.fli.view = 'components/_index/core/uix/share/share.view.html';
      }
    }

    function get() {
      return {
        href: _href,
        item: _item
      };
    }

    function run(connector) {
      google.url.insert(_href)
        .success(function (res) {
          if (res && res.id) {
            var id = res.id.split('goo.gl/').splice(1)[0],
              page = CONFIG.PRODUCTION + 'page?id=' + id;
            url.link(connectors[connector](page, _item, _href));
            $rootScope.fli.view = '';
          }
        });
    }

    return {
      url: _url,
      get: get,
      run: run
    };

  });


