'use strict';

angular
  .module('fli.search')
  .factory('FEEDS',
  function ($http, api) {

    function get(params) {
      return $http.get(api.enpoint('feeds/all'), {
        params: params
      });
    }

    function post(data) {
      return $http.post(api.enpoint('feeds/create'), data);
    }

    return {
      get: get,
      post: post
    };

  });
