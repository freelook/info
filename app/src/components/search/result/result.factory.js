'use strict';
angular
  .module('fli.search')
  .factory('result', function ($rootScope, url, facebook) {

    function href(config) {
      return url.href('look?', {
        input: $rootScope.fli.route.input || config.text || null,
        url: !!config.url ? encodeURIComponent(config.url) : '',
        img: !!config.img ? encodeURIComponent(config.img) : null,
        text: config.text || null
      });
    }

    function share(url, img, text) {
      var input = $rootScope.fli.route.input || text || '';
      var href = 'http://freelook.info/search?input=' + input;
      if (img) {
        href += '&metaimg=' + img;
      }
      if (text) {
        href += '&metatext=' + text;
      }
      return facebook.share(href);
    }

    return {
      href: href,
      share: share
    };

  });


