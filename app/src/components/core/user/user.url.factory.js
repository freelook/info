'use strict';
angular
  .module('fli.core')
  .factory('userUrl', function (url, locale) {

    function href(nickname) {
      return url.href(['~/', nickname || '', '?'].join(''), {l: locale.getCode()}, false, '/');
    }

    return {
      href: href
    };

  });


