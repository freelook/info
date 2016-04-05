'use strict';

angular
  .module('fli.look')
  .factory('full',
  function ($location, $cacheFactory, url, parser, readability) {

    var cache = $cacheFactory('full');

    function _prepareHtml(_url, _html) {
      var dom = parser.parseFromString(_html, 'text/html'),
        $dom = $(dom);

      _fixTags($dom);
      _fixLink($dom);
      _fixImg($dom, _url);

      var article = angular.extend({
        rss: _getRSS($dom, _url)
      }, readability.parse(_url, dom));

      _storeData(article);
      return article;
    }

    function _originLink(_url) {
      var link = url.parse(decodeURIComponent(_url));
      return link.protocol + '//' + link.host;
    }

    function _fixHref(_href, origin) {
      if (_href && origin) {
        switch (_href.substr(0, 2)) {
          case 'ht':
          case '//':
            return _href;
          case 'ma':
            return _href;
          default:
            return _href.charAt(0) === '/' ? [origin, _href].join('') : [origin, _href].join('/');
        }
      }
    }

    function _fixTags($dom) {
      $dom.find('script, style, button, select, form, input').remove();
    }

    function _fixLink($dom) {
      $dom.find('a').contents().unwrap();
    }

    function _fixImg($dom, _url) {
      var origin = _originLink(_url);
      $dom.find('img').each(function (i, e) {
        $(e)
          .attr('src', function (i, src) {
            _fixHref(src, origin);
          })
          .removeAttr('width height style')
          .attr('fli-err', '');
      });
    }

    function _getRSS($dom, _url) {
      var origin = _originLink(_url),
        href = $dom.find('*[type="application/rss+xml"]').attr('href') || $dom.find('*[type="application/atom+xml"]').attr('href');
      return _fixHref(href, origin);
    }

    function _storeData(data) {
      cache.put($location.url(), data);
    }

    function get(_url, _html) {
      return cache.get($location.url()) || _prepareHtml(_url, _html);
    }

    return {
      get: get,
      fixHref: _fixHref,
      getRSS: _getRSS
    };

  });
