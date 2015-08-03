'use strict';
angular
  .module('fli.share')
  .factory('share', function ($location, url, facebook) {

    function _url(_href) {
      var href = _href || $location.url();
      try {
        href = url.href('share?', {url: encodeURIComponent(decodeURIComponent(href))});
      } catch (e) {
        console.log(e);
      }

      return facebook.share(href);
    }

    return {
      url: _url
    };

  });


