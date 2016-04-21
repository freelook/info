'use strict';
angular
  .module('fli.core')
  .factory('foursquare',
  function (api) {

    function places(q, l) {
      var location = !!l ? '&ll=' + l : '&intent=global',
        point = encodeURIComponent('venues/search?query=' + q + location);
      return api.foursquare(point);
    }

    return {
      places: places
    };

  });


