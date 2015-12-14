'use strict';
angular
  .module('freelook.info')
  .factory('twitter', function (api) {

    function search(q) {
      var point = encodeURIComponent('search/tweets.json?q=' + q);
      return api.twitter(point);
    }

    function link(_id) {
      var id = _id || '';
      return 'https://twitter.com/' + id;
    }

    return {
      search: search,
      link: link
    };

  });
