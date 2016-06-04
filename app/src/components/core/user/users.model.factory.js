'use strict';

angular
  .module('fli.core')
  .factory('USERS',
  function ($http, api) {

    function get(params) {
      return $http.get(api.enpoint('users'), {
        params: params
      });
    }

    function post(data) {
      return $http.post(api.enpoint('users'), data);
    }

    return {
      get: get,
      post: post
    };

  });
