'use strict';
angular
  .module('fli.search')
  .factory('Google', function ($http) {

    function search(q, callBack) {
      if (q && typeof callBack === 'function') {
        var gapi = 'https://www.googleapis.com/customsearch/v1element?key=AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY&cx=007077922014062052604:wiiu7xrm8yk&q=' + q + '&callback=JSON_CALLBACK';
        $http.jsonp(gapi).success(function (data) {
          if (data) {
            callBack(data);
          }
        });
      }
    }

    return {
      search: search
    };

  });
