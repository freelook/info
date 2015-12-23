'use strict';
angular
  .module('fli.search')
  .factory('lucky', function ($q, google) {

    var word = 'top';

    function get() {
      var defer = $q.defer();
      google.random()
        .success(function (lucky) {
          word = lucky.word;
          defer.resolve(word);
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

