'use strict';
angular
  .module('freelook.info')
  .factory('google', function (platform, googleSite, googleChrome) {

    var googleConnectors = {
      site: googleSite,
      chrome: googleChrome
    };

    return googleConnectors[platform.name()];

  })
  .constant('GAPI', {
    web: 'https://www.googleapis.com/customsearch/v1element?key=AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY&cx=007077922014062052604:wiiu7xrm8yk&num=12&q=',
    image: 'https://www.googleapis.com/customsearch/v1element?key=AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY&cx=007077922014062052604:wiiu7xrm8yk&num=12&searchtype=image&q=',
    autocomplete: 'http://suggestqueries.google.com/complete/search?client=chrome&q=',
    random: 'http://api.wordnik.com/v4/words.json/randomWord?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5',
    feeds: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=24&q=',
    trends: 'http://www.google.com/trends/hottrends/atom/hourly?pn=',
    news: 'http://news.google.com/news?output=rss&q=',
    video: 'https://ajax.googleapis.com/ajax/services/search/video?&v=1.0&rsz=8&q='
  });
