'use strict';
angular
  .module('fli.core')
  .factory('url', function ($window, $rootScope, nav, platform, inAppBrowser) {

    var platformOrigin = platform.origin();

    function parse(_url) {
      var url = $window.document.createElement('a');
      url.href = _url;
      return url;
    }

    function extract(_pattern, _url) {
      var pattern = new $window.UrlPattern(_pattern);
      return pattern.match(_url) || {};
    }

    function qToObj(search) {
      var queryObj = {};
      search.replace(/([^?=&]+)(=([^&]*))?/g, function ($0, $1, $2, $3) {
        queryObj[$1] = $3;
      });
      return queryObj;
    }


    function qByName(name, search) {
      var match = (new RegExp('[?&]' + name + '=([^&]*)')).exec(search);
      return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }

    function href(path, params, replace, origin) {
      var route = $rootScope.fli.route,
        currentPath = nav.path().slice(1),
        _path = path || currentPath + '?',
        _params = params || {},
        _origin = origin || platformOrigin,
        _href = _origin + _path;
      if (!!replace && !!~_path.indexOf(currentPath) && !angular.equals(route, {})) {
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
        var decodedHref = decode(href);
        if (platform.name() !== 'mobile') {
          $window.open(decodedHref, !self ? '_blank' : '_self');
        } else {
          inAppBrowser.open(decodedHref);
        }
      }
    }

    function decode(_url) {
      var decodedUrl;
      try {
        decodedUrl = !!_url ? decodeURIComponent(_url) : '';
      } catch (e) {
        decodedUrl = '';
      }
      return decodedUrl;
    }

    function encode(_url) {
      return encodeURIComponent(decode(_url));
    }

    return {
      parse: parse,
      href: href,
      extract: extract,
      qToObj: qToObj,
      qByName: qByName,
      link: link,
      location: platform.name() !== 'chrome' ? nav.location : link,
      decode: decode,
      encode: encode
    };

  });



