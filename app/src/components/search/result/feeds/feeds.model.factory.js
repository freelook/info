'use strict';

angular
  .module('fli.search')
  .factory('FEEDS',
  function (user, Firebase) {

    var FEEDS = Firebase.ref('feeds');

    function query() {
      var _query = FEEDS;
      return _query.limitToFirst(24).once('value');
    }

    function add(_feed) {
      return FEEDS.push(_feed);
    }

    return {
      query: query,
      add: add
    };

  });
