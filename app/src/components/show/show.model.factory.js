'use strict';

angular
  .module('fli.show')
  .factory('SHOW',
  function (user, Parse) {

    var SHOW = Parse.Object.extend('SHOW'),
      query = new Parse.Query(SHOW);

    function get() {
      return query.find();
    }

    function add(_show) {
      var show = new SHOW();
      show.set('user', user.current());
      return show.save(_show);
    }

    return {
      get: get,
      add: add
    };

  });
