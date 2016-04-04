'use strict';
angular
  .module('fli.look')
  .factory('readability', function ($http, $window, content) {


    function parse(_site, dom) {
      var site = content.site(_site),
        config = {
          spec: site.href,
          host: site.host,
          prePath: site.protocol + '//' + site.host,
          scheme: site.protocol.substr(0, site.protocol.indexOf(':')),
          pathBase: site.protocol + '//' + site.host + site.pathname.substr(0, site.pathname.lastIndexOf('/') + 1)
        };

      return new $window.Readability(config, dom).parse();
    }

    function read(_url) {
      var rapi = 'https://readability.com/api/content/v1/parser?url=' + _url + '&token=b727165def07f9d405d194498ba5e3df21c87535&callback=JSON_CALLBACK';
      return $http.jsonp(rapi);
    }

    return {
      parse: parse,
      read: read
    };

  });




