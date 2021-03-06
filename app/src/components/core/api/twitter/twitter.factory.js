'use strict';
angular
  .module('freelook.info')
  .factory('twitter', function (api, locale) {

    function search(q) {
      var point = encodeURIComponent('search/tweets.json?count=24&result_type=popular&lang=' +
        locale.getLng() + '&q=' + q);
      return api.twitter(point);
    }

    function images(q) {
      var point = encodeURIComponent('search/tweets.json?count=48&result_type=popular&lang=' +
        locale.getLng() + '&q=' + q);
      return api.twitter(point);
    }

    function people(q) {
      var point = encodeURIComponent('users/search.json?&q=' + q);
      return api.twitter(point);
    }

    function link(_id) {
      var id = _id || '';
      return 'https://twitter.com/' + id;
    }

    return {
      search: search,
      images: images,
      people: people,
      link: link
    };

  });
