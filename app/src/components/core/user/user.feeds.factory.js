'use strict';
angular
  .module('fli.core')
  .factory('userFeeds', function ($q, storage, userParams, feeds, toast, USERS) {

    var FEEDS_STORAGE_TYPES = {
      looks: 'LOOK_KEY',
      stars: 'STAR_KEY',
      subscription: 'SUB_KEY'
    };

    function _syncFeeds(nickname, feeds, params) {
      return USERS.syncFeeds(nickname, feeds, params);
    }

    function local(type) {
      return storage.get(storage.keys[FEEDS_STORAGE_TYPES[type]], []);
    }

    function get(type) {
      var nickname = userParams.routeNickName();
      if (nickname && type) {
        return USERS.getFeeds(nickname, {type: type});
      }
      return $q.when({data: local(type)});
    }

    function sync(nickname) {
      return $q.all(['looks', 'stars', 'subscription'].map(function (type) {
        return _syncFeeds(nickname, local(type), {type: type});
      }));
    }

    function addItem(type, item) {
      if (storage.arr.push(FEEDS_STORAGE_TYPES[type], item)) {
        if (userParams.isAnonymous()) {
          feeds.add(item);
        } else {
          _syncFeeds(userParams.localNickName(), [item], {type: type});
        }
      }
      toast.show('uix.item.stared', {v: item.title});
    }

    function clearItem(type, item) {
      var data = storage.arr.clearItem(storage.keys[FEEDS_STORAGE_TYPES[type]], item);
      if (userParams.isLocal()) {
        return USERS.delFeeds(userParams.localNickName(), [item], {type: type});
      }
      return $q.when({data: data});
    }

    return {
      local: local,
      get: get,
      sync: sync,
      addItem: addItem,
      clearItem: clearItem
    };

  });


