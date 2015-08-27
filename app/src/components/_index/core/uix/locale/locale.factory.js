'use strict';
angular
  .module('freelook.info')
  .factory('locale', function ($window, local) {

    var locales = {
      en: 'en',
      ru: 'ru'
    }, trends = {
      en: 'p1',
      ru: 'p14'
    }, news = {
      en: 'us',
      ru: 'ru_ru'
    };

    function init(value) {
      var locale = get(), navigatorLanguage = !!isRu() ? locales.ru : locales.en,
        lng = locales[value] || locale || navigatorLanguage;
      if (lng !== locale) {
        local.set('locale', lng);
      }
      return lng;
    }

    function get() {
      return local.get('locale');
    }

    function getTrendsCode() {
      return trends[get()] || trends.en;
    }

    function getNewsCodes() {
      return news[get()] || news.en;
    }

    function isRu() {
      var navigatorLanguage = $window.navigator.userLanguage || $window.navigator.language;
      return navigatorLanguage.match(/ru/gi);
    }

    return {
      init: init,
      get: get,
      getTrendsCode: getTrendsCode,
      getNewsCodes: getNewsCodes,
      locales: locales,
      trends: trends,
      news: news
    };

  });


