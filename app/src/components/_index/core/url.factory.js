'use strict';
angular
  .module('freelook.info')
  .factory('url', function ($window, $rootScope, $location, CONFIG) {

    function parse(_url) {
      var url = $window.document.createElement('a');
      url.href = _url;
      return url;
    }

    function extract(_pattern, _url) {
      var pattern = new $window.UrlPattern(_pattern);
      return pattern.match(_url) || {};
    }

    function qByName(name, search) {
      var match = (new RegExp('[?&]' + name + '=([^&]*)')).exec(search);
      return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }

    function href(path, params, replace, origin) {
      var route = $rootScope.fli.route,
        _params = params || {},
        _origin = origin || CONFIG.ORIGIN,
        _href = _origin + path;
      if (!!replace && !!~path.indexOf($location.path().slice(1)) && !angular.equals(route, {})) {
        angular.forEach(route, function (v, k) {
          _href += k + '=' + (_params[k] || v) + '&';
        });
      } else {
        angular.forEach(_params, function (v, k) {
          if (v || v === '') {
            _href += k + '=' + v + '&';
          }
        });
      }
      return _href.charAt(_href.length - 1) === '&' ? _href.slice(0, -1) : _href;
    }

    function link(href, self) {
      if (href) {
        $('<a>').attr('href', href).attr('target', !self ? '_blank' : '')[0].click();
      }
    }

    function location(href) {
      if (href) {
        $window.location.href = href;
      }
    }

    function decode(_url) {
      return !!_url ? decodeURIComponent(_url) : '';
    }

    return {
      parse: parse,
      href: href,
      extract: extract,
      qByName: qByName,
      link: link,
      location: location,
      decode: decode
    };

  });



