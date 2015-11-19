'use strict';

angular
  .module('fli.show')
  .factory('SHOW',
  function (user, Parse) {

    var SHOW = Parse.Object.extend('SHOW'),
      _query = new Parse.Query(SHOW);

    function query() {
      return _query;
    }

    function add(_show) {
      var show = new SHOW();
      show.set('user', user.current());
      return show.save(_show);
    }


    return {
      query: query,
      add: add
    };

  });
