'use strict';

angular
  .module('fli.core')
  .factory('USERS',
  function ($http, api) {

    var USERS_ENDPOINT = api.enpoint('users');

    function all(params) {
      return $http.get(USERS_ENDPOINT, {
        params: params
      });
    }

    function one(nickname, params) {
      return $http.get([USERS_ENDPOINT, nickname].join('/'), {
        params: params
      });
    }

    function create(data, params) {
      return $http.post(USERS_ENDPOINT, data, params);
    }

    function syncData(nickname, data, params) {
      return $http.post([USERS_ENDPOINT, nickname, 'data'].join('/'), data, {params: params});
    }

    function syncFeeds(nickname, feeds, params) {
      return $http.post([USERS_ENDPOINT, nickname, 'feeds'].join('/'), feeds, {params: params});
    }

    function getFeeds(nickname, params) {
      return $http.get([USERS_ENDPOINT, nickname, 'feeds'].join('/'), {params: params});
    }

    function delFeed(nickname, feedId, params) {
      return $http.delete([USERS_ENDPOINT, nickname, 'feed', feedId].join('/'), {params: params});
    }

    return {
      all: all,
      one: one,
      create: create,
      syncData: syncData,
      syncFeeds: syncFeeds,
      getFeeds: getFeeds,
      delFeed: delFeed
    };

  });
