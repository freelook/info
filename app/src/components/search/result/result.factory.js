'use strict';
angular
  .module('fli.search')
  .factory('result', function ($rootScope, url, share, CONFIG) {

    function _href(config, origin) {
      return url.href('look?', {
        input: $rootScope.fli.route.input || config.text || null,
        url: !!config.url ? encodeURIComponent(decodeURIComponent(config.url)) : '',
        img: !!config.img ? encodeURIComponent(decodeURIComponent(config.img)) : null,
        text: config.text || null
      }, false, origin);
    }

    function _share(_config) {
      var config = _config || {};
      return share.url(_href(config, CONFIG.PRODUCTION));
    }

    return {
      href: _href,
      share: _share
    };

  });


