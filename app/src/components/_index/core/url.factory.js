'use strict';
angular
  .module('freelook.info')
  .factory('url', function ($window) {

    function parse(_url) {
      var url = $window.document.createElement('a');
      url.href = _url;
      return url;
    }

    function extract(_pattern , _url) {
      var pattern = new $window.UrlPattern(_pattern);
      return pattern.match(_url);
    }

    function qByName(name, search) {
      var match = (new RegExp('[?&]' + name + '=([^&]*)')).exec(search);
      return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }

    return {
      parse: parse,
      extract: extract,
      qByName: qByName
    };

  });



