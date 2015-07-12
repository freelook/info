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

    function href(path, params, replace) {
      var route = $rootScope.fli.route,
        _params = params || {},
        _href = CONFIG.ORIGIN + path;
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

    return {
      parse: parse,
      href: href,
      extract: extract,
      qByName: qByName
    };

  });



