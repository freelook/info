'use strict';
angular
  .module('freelook.info')
  .factory('pinterest', function ($http, $window, $timeout, api, PINTEREST_API) {

    function _enpoint(_end) {
      return PINTEREST_API.ENDPOINT + _end;
    }

    function _point(_end) {
      return $http.get(_enpoint(_end));
    }

    function pins(q) {
      return _point('pidgets/users/' + q + '/pins/');
    }

    function boards(q) {
      return _point('pidgets/boards' + q + 'pins/');
    }

    function link(_path) {
      return 'https://www.pinterest.com' + _path;
    }

    return {
      pins: pins,
      boards: boards,
      link: link
    };

  })
  .constant('PINTEREST_API', {
    ENDPOINT: 'https://api.pinterest.com/v3/'
  });

