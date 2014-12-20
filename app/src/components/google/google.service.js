'use strict';
angular
  .module('freelook.info')
  .factory('Google', function ($http) {

    function search(q, callBack) {
      if (q) {
        var gp = 'https://www.googleapis.com/customsearch/v1element?key=AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY&cx=007077922014062052604:wiiu7xrm8yk&q=' + q + '&callback=JSON_CALLBACK';
        $http.jsonp(gp).success(function (data) {
          if (data && typeof callBack === 'function') {
            callBack(data);
          }
        });
      }

    }

    return {
      search: search
    };

  });
