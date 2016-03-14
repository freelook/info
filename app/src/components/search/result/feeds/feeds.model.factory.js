'use strict';

angular
  .module('fli.search')
  .factory('FEEDS',
  function (user, Firebase) {

    var FEEDS = Firebase.ref('feeds');

    function query(input) {
      var _query = FEEDS;
      if (input) {
        _query = _query.orderByChild('input').startAt(input);
      }
      return Firebase.loader(_query.limitToFirst(36).once('value'));
    }

    function add(_feed) {
      return FEEDS.push(_feed);
    }

    return {
      query: query,
      add: add
    };

  });
