'use strict';

angular
  .module('fli.show')
  .factory('SHOW',
  function (user, Parse) {

    var SHOW = Parse.Object.extend('SHOW'),
      Show = new Parse.Query(SHOW);

    function query() {
      return Show;
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
