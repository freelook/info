'use strict';
angular
  .module('fli.look')
  .factory('Short', function ($sce, $window, $location, $rootScope, $cacheFactory) {

    var cache = $cacheFactory('short'),
      parser = new window.DOMParser(),
      body = '', dom = '';

    function _clearTemp() {
      body = '';
      dom = '';
    }

    function _parseLink() {
      var link = window.document.createElement('a');
      link.href = $rootScope.fli.route.url;
      return link.protocol + '//' + link.host;
    }

    function _fixLinks(html, type) {
      var link = _parseLink();
      html.find('a').each(function (i, e) {
        $(e).attr('href', function (i, value) {
          if (value) {
            switch (value.substr(0, 1)) {
              case 'h':
                break;
              case '/':
                value = link + value;
                break;
              case 'm':
                return value;
              default:
                value = link + '/' + value;
            }
          }
          return 'http://' + $window.location.host + '/look?url=' + value + '&input=' + $rootScope.fli.route.input + '&type=' + type;
        });
      });
    }

    function _findHtml(dom, by) {
      var div = null;
      if (!body) {
        body = $('body', dom);
      }

      if (by === 'body') {
        return body;
      }

      $('*:contains(' + by + ')', body)
        .each(function (i, e) {

          var element = $(e);

          if (!element.children().length) {
            if (!div) {
              div = $('<div>');
            }
            div.append(element.parent());
          }

        });

      return div;
    }

    function _shortHTML(html, by) {

      var short = [],
        findHtml;

      dom = !dom ? parser.parseFromString(html, 'text/html') : dom;
      findHtml = _findHtml(dom, by);

      if (findHtml) {
        findHtml.each(function (i, e) {
          var _el = $(e);
          _el.find('script, iframe, img').remove();
          _fixLinks(_el, 'short');
          var html = _el.html();
          if (html) {
            short.push({html: $sce.trustAsHtml(html)});
          }
        });
      }

      return !!short.length ? short : '';
    }

    function _shortDataByContext(html, by) {
      var data = null;
      [by.context, by.input].some(function (e) {
        data = _shortHTML(html, e);
        return !!data;
      });
      _storeData(data);
      return data;
    }

    function _shortDataByInput(html, by) {
      var data = null,
        input = by.input || '',
        inputs = input.split(' ');
      if (inputs.length > 2) {
        inputs.sort(function (a, b) {
          return b.length - a.length;
        });
        inputs.some(function (e) {
          data = _shortHTML(html, e);
          return !!data;
        });
      }
      _storeData(data);
      return data;
    }

    function _shortByBody(html) {
      var data = _shortHTML(html, 'body');
      _storeData(data);
      return data;
    }

    function _storeData(data) {
      cache.put($location.url(), data);
    }

    function get(html, by) {
      _clearTemp();
      return cache.get($location.url()) || _shortDataByContext(html, by) || _shortDataByInput(html, by) || _shortByBody(html);
    }

    return {
      get: get,
      fixLinks: _fixLinks
    };
  });
