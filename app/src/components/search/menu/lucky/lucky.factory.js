'use strict';
angular
  .module('fli.search')
  .factory('lucky', function ($q, google) {

    var word = 'new';

    function get() {
      var defer = $q.defer();
      google.random()
        .success(function (lucky) {
          defer.resolve(lucky.word);
        })
        .error(function () {
          defer.resolve(word);
        });
      return defer.promise;
    }

    return {
      word: word,
      get: get
    };

  });

