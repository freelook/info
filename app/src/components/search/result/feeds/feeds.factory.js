'use strict';

angular
  .module('fli.search')
  .factory('feeds',
  function (FEEDS) {

    function query(input, page) {
      return FEEDS.get({
        input: input,
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
