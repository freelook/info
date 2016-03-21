'use strict';

angular
  .module('fli.search')
  .factory('FEEDS',
  function ($http, CONFIG) {

    function query(input) {
      return $http.get([CONFIG.API.URL, 'feeds/all'].join(''), {
        params: {
          input: input
        }
      });
    }

    function add(_feed) {
      return $http.post([CONFIG.API.URL, 'feeds/create'].join(''), _feed);
    }

    return {
      query: query,
      add: add
    };

  });
