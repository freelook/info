'use strict';
angular
  .module('fli.home')
  .factory('hotTrends', function ($q, $cacheFactory, api, locale, parser, CONFIG) {

    //var cache = $cacheFactory('hotTrends');

    var tapi = '';

    function _htmlToTrends(html) {
      var dom = parser.parseFromString(html, 'text/html'),
        $dom = $(dom), trends = [];
      $dom.find('.hottrends-trends-list-trend-container').each(function (i, e) {
        var element = $(e);
        trends.push({
          title: element.find('.hottrends-single-trend-title').text(),
          img: 'http:' + element.find('.hottrends-single-trend-image-and-text-container img').attr('src'),
          text: element.find('.hottrends-single-trend-news-snippet').text(),
          url: element.find('.hottrends-single-trend-news-article-container a').attr('href')
        });
      });

      //cache.put(tapi, trends);
      return trends;
    }

    return function () {
      var defer = $q.defer();
      tapi = CONFIG.PRERENDER.URL + 'https://www.google.com/trends/hottrends?pn=' + locale.getPnCode();

      api
        .proxy(tapi, {cache: true})
        .success(function (html) {
          return defer.resolve(_htmlToTrends(html));
        })
        .error(function (trends) {
          return defer.reject(trends);
        });

      return defer.promise;
    };

  });


