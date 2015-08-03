'use strict';
angular
  .module('fli.search')
  .factory('result', function ($rootScope, url, share, CONFIG) {

    function _href(config) {
      return url.href('look?', {
        input: $rootScope.fli.route.input || config.text || null,
        url: !!config.url ? encodeURIComponent(config.url) : '',
        img: !!config.img ? encodeURIComponent(config.img) : null,
        text: config.text || null
      });
    }

    function _share(url, img, text) {
      var href = '';
      if (url) {
        href = _href({text: text, img: img, url: url}).split(CONFIG.ORIGIN.slice(0, -1))[1];
      }
      return share.url(href);
    }

    return {
      href: _href,
      share: _share
    };

  });


