'use strict';
angular
  .module('fli.core')
  .factory('googlePlus', function ($http, GAPI, CONFIG) {

    function _data(point, token) {
      var request = [GAPI.plus, point, !!token ? '?access_token=' + token : '&key=' + CONFIG.API.GOOGLE.KEY].join('');
      return $http.get(request);
    }

    function people(q) {
      var point = 'people?query=' + q + '&fields=items(url,image,displayName,aboutMe,gender)';
      return _data(point);
    }

    return {
      data: _data,
      people: people
    };

  });
