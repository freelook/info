'use strict';
angular
  .module('fli.core')
  .factory('userFeeds', function ($q, storage, userParams, feeds, USERS) {

    var FEEDS_STORAGE_TYPES = {
      looks: 'LOOK_KEY',
      stars: 'STAR_KEY',
      subscription: 'SUB_KEY'
    };

    function setTimeStamp(type) {
      var timestamp = getTimeStamp();
      timestamp = typeof timestamp === 'object' ? timestamp : {};
      timestamp[type] = (new Date()).getTime();
      storage.set(storage.keys.FEEDS_TIMESTAMP_KEY, timestamp);
    }

    function getTimeStamp(type) {
      var timestamp = storage.get(storage.keys.FEEDS_TIMESTAMP_KEY, {});
      if (type) {
        return timestamp[type];
      }
      return timestamp;
    }

    function _syncFeeds(nickname, feeds, params) {
      var _params = params || {};
      setTimeStamp(_params.type);
      return USERS.syncFeeds(nickname, feeds, _params);
    }

    function _keyByType(type) {
      return storage.keys[FEEDS_STORAGE_TYPES[type]];
    }

    function local(type) {
      return storage.get(_keyByType(type), []);
    }

    function get(type) {
      var nickname = userParams.routeNickName();
      if (nickname && type) {
        return USERS.getFeeds(nickname, {type: type, timestamp: getTimeStamp(type)});
      }
      return $q.when({data: local(type)});
    }

    function sync(nickname) {
      return $q.all(['looks', 'stars', 'subscription'].map(function (type) {
        return _syncFeeds(nickname, local(type), {type: type});
      }));
    }

    function addItem(type, item) {
      if (storage.arr.push(_keyByType(type), item, 123)) {
        if (userParams.isAnonymous()) {
          feeds.add(item);
        } else {
          _syncFeeds(userParams.localNickName(), [item], {type: type});
        }
      }
    }

    function clearItem(type, item) {
      var data = storage.arr.clearItem(_keyByType(type), item);
      if (userParams.isLocal() && item && item.id) {
        setTimeStamp();
        return USERS.delFeed(userParams.localNickName(), item.id, {type: type});
      }
      return $q.when({data: data});
    }

    return {
      setTimeStamp: setTimeStamp,
      getTimeStamp: getTimeStamp,
      local: local,
      get: get,
      sync: sync,
      addItem: addItem,
      clearItem: clearItem
    };

  });


