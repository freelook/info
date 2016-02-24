'use strict';

angular
  .module('fli.show')
  .factory('SHOW',
  function (user, Firebase) {

    var SHOWS = Firebase.ref('shows');

    function query() {
      return SHOWS.limitToFirst(24).once('value');
    }

    function add(_show) {
      return SHOWS.push(_show);
    }

    return {
      query: query,
      add: add
    };

  });
