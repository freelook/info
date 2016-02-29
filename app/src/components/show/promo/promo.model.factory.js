'use strict';

angular
  .module('fli.show')
  .factory('PROMO',
  function (user, Firebase) {

    var PROMOS = Firebase.ref('promos');

    function query() {
      return PROMOS.limitToFirst(24).once('value');
    }

    function add(_promo) {
      return PROMOS.push(_promo);
    }

    return {
      query: query,
      add: add
    };

  });
