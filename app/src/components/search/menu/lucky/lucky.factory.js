'use strict';
angular
  .module('fli.search')
  .factory('lucky', function ($q, $parse, google, chips, url, locale) {

    var word = 'new';

    function random(number) {
      return Math.floor((Math.random() * number));
    }

    function get() {
      var defer = $q.defer();
      google.random()
        .success(function (lucky) {
          defer.resolve({
            word: lucky.word,
            href: href(lucky.word)
          });
        })
        .error(function () {
          defer.resolve({
            word: word,
            href: href(word)
          });
        });
      return defer.promise;
    }

    function href(input) {
      var type = $parse('type')(chips.types[random(chips.types.length)]),
        sub = $parse('sub')(chips.subs[type][random(chips.subs[type].length)]);
      return url.href('?', {l: locale.getCode(), input: input, type: type, sub: sub}, false, '/');
    }

    return {
      random: random,
      word: word,
      get: get,
      href: href
    };

  });

