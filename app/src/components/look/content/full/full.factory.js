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

      var article = readability.parse(_url, dom);
      _storeData(article);
      return article;
    }

    function _originLink(_url) {
      var link = url.parse(decodeURIComponent(_url));
      return link.protocol + '//' + link.host;
    }

    function _fixTags($dom) {
      $dom.find('script,style').remove();
    }

    function _fixImg($dom, _url) {
      var origin = _originLink(_url);
      $dom.find('img').each(function (i, e) {
        $(e)
          .attr('src', function (i, src) {
            if (src) {
              switch (src.substr(0, 2)) {
                case 'ht':
                case '//':
                  return src;
                default:
                  return src.charAt(0) === '/' ? origin + src : origin + '/' + src;
              }
            }
          })
          .attr('fli-err', '');
      });
    }

    function _fixLink($dom) {
      $dom.find('a').contents().unwrap();
    }

    function _storeData(data) {
      cache.put($location.url(), data);
    }

    function get(_url, _html) {
      return cache.get($location.url()) || _prepareHtml(_url, _html);
    }

    return {
      get: get
    };

  });
