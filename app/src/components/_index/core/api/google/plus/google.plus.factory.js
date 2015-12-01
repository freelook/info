'use strict';
angular
  .module('freelook.info')
  .factory('googlePlus', function ($http, GAPI, CONFIG) {

    function _plus(point) {
      return $http.get(GAPI.plus + point + '&key=' + CONFIG.API.GOOGLE.KEY);
    }

    function people(q) {
      var point = 'people?query=' + q;
      return _plus(point);
    }

    return {
      people: people
    };

  });
