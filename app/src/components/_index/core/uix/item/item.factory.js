'use strict';
angular
  .module('freelook.info')
  .factory('item', function ($rootScope, url, share, locale, CONFIG) {

    function _href(config, origin) {
      return url.href('?', {
        l: locale.getCode(),
        input: config.input || $rootScope.fli.route.input || null,
        type: config.type || $rootScope.fli.route.type || null,
        sub: config.sub || $rootScope.fli.route.sub || null,
        url: !!config.url ? encodeURIComponent(decodeURIComponent(config.url)) : '',
        img: !!config.img ? encodeURIComponent(decodeURIComponent(config.img)) : null
      }, false, origin);
    }

    function _share(_item) {
      switch (typeof _item) {
        case 'string':
          return share.url(_item);
        case 'object':
          return share.url(_href(_item, CONFIG.PRODUCTION));
      }
    }

    function _search(input) {
      return url.href('?', {l: locale.getCode(), input: input});
    }

    return {
      href: _href,
      share: _share,
      search: _search
    };

  });


