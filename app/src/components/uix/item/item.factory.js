'use strict';
angular
  .module('freelook.info')
  .factory('item', function ($rootScope, url, share, locale, storage, STORAGE_KEYS, CONFIG) {

    function _config(data) {
      return {
        l: locale.getCode(),
        input: data.input || $rootScope.fli.route.input || null,
        type: data.type || $rootScope.fli.route.type || null,
        sub: data.sub || $rootScope.fli.route.sub || null,
        url: !!data.url ? encodeURIComponent(decodeURIComponent(data.url)) : null,
        img: !!data.img ? encodeURIComponent(decodeURIComponent(data.img)) : null
      };
    }

    function _href(data, origin) {
      return url.href('?', _config(data), false, origin);
    }

    function _share(_item) {
      switch (typeof _item) {
        case 'string':
          return share.url(_item);
        case 'object':
          return share.url(_href(_item, CONFIG.PRODUCTION));
      }
    }

    function _star(data) {
      storage.arr.push(STORAGE_KEYS.STAR_KEY, _config(data));
    }

    function _search(input) {
      return _href({input: input});
    }

    return {
      config: _config,
      href: _href,
      share: _share,
      star: _star,
      search: _search
    };

  });


