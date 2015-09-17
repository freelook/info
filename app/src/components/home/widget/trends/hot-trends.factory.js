'use strict';
angular
  .module('fli.home')
  .factory('hotTrends',
  function ($rootScope, $q, $cacheFactory, api, locale, parser, prerender, platform) {

    var cache = $cacheFactory('hotTrends');

    var tapi = '',
      connectors = {
        site: function (defer) {
          prerender.cache(tapi)
            .success(function (html) {
              return defer.resolve(_htmlToTrends(html));
            })
            .error(function (trends) {
              return defer.reject(trends);
            });
        },
        chrome: function (defer) {
          prerender.local(tapi)
            .then(function (html) {
              return defer.resolve(_htmlToTrends(html));
            })
            .catch(function (trends) {
              return defer.reject(trends);
            });
        }
      };

    function _htmlToTrends(html) {
      var dom = parser.parseFromString(html, 'text/html'),
        $dom = $(dom), trends = [];
      $dom.find('.hottrends-trends-list-trend-container').each(function (i, e) {
        var element = $(e);
        trends.push({
          title: element.find('.hottrends-single-trend-title').text(),
          img: element.find('.hottrends-single-trend-image-and-text-container img').attr('src'),
          text: element.find('.hottrends-single-trend-news-snippet').text(),
          url: element.find('.hottrends-single-trend-news-article-container a').attr('href')
        });
      });

      if (trends.length) {
        cache.put(tapi, trends);
      }

      return trends;
    }

    return function () {
      var defer = $q.defer();
      tapi = 'https://www.google.com/trends/hottrends?pn=' + locale.getPnCode();
      if (cache.get(tapi)) {
        return $q.when(cache.get(tapi));
      }
      connectors[platform.name()](defer);
      return defer.promise;
    };

  });


