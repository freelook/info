'use strict';
angular
  .module('freelook.info')
  .factory('item', function ($rootScope, url, share, locale, CONFIG) {

    function _href(config, origin) {
      return url.href('look?', {
        input: $rootScope.fli.route.input || config.input || config.text || null,
        url: !!config.url ? encodeURIComponent(decodeURIComponent(config.url)) : '',
        img: !!config.img ? encodeURIComponent(decodeURIComponent(config.img)) : null,
        l: locale.getCode()
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

    function search(input) {
      return url.href('search?', {input: input, l: locale.getCode()});
    }

    return {
      href: _href,
      share: _share,
      search: search
    };

  });


