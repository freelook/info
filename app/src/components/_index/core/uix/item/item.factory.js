'use strict';
angular
  .module('freelook.info')
  .factory('item', function ($rootScope, url, share, CONFIG) {

    function _href(config, origin) {
      return url.href('look?', {
        input: $rootScope.fli.route.input || config.input || config.text || null,
        url: !!config.url ? encodeURIComponent(decodeURIComponent(config.url)) : '',
        img: !!config.img ? encodeURIComponent(decodeURIComponent(config.img)) : null,
        text: config.text || null
      }, false, origin);
    }

    function _share(_config) {
      if (_config) {
        switch (typeof _config) {
          case 'string':
            return share.url(_config);
          case 'object':
            return share.url(_href(_config, CONFIG.PRODUCTION), _config);
        }
      }
    }

    function search(input) {
      return url.href('search?', {input: input});
    }

    return {
      href: _href,
      share: _share,
      search: search
    };

  });


