'use strict';

angular
  .module('fli.search')
  .factory('feeds',
  function (FEEDS) {

    function query(route, page) {
      return FEEDS.get({
        input: route.input,
        l: route.l,
        page: page
      });
    }

    function add(_feed) {
      return FEEDS.post(_feed);
    }

    return {
      query: query,
      add: add
    };

  });
