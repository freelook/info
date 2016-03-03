'use strict';

angular
  .module('fli.show')
  .factory('PROMO',
  function (user, Firebase) {

    var PROMOS = Firebase.ref('promos');

    function query() {
      var _query = PROMOS;
      if (user.authData().uid) {
        _query = _query.orderByChild('users/' + user.authData().uid).equalTo(null);
      }
      return _query.limitToFirst(24).once('value');
    }

    function add(_promo) {
      return PROMOS.push(_promo);
    }

    return {
      query: query,
      add: add
    };

  });