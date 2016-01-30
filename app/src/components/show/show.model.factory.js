'use strict';

angular
  .module('fli.show')
  .factory('SHOW',
  function (user, $firebaseArray, Firebase) {

    var SHOWS = $firebaseArray(Firebase.ref('shows').limitToFirst(24));

    function query() {
      return SHOWS.$loaded();
    }

    function add(_show) {
      return SHOWS.$add(_show);
    }

    return {
      query: query,
      add: add
    };

  });
