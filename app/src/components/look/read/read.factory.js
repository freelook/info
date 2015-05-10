'use strict';
angular
  .module('fli.look')
  .factory('read', function ($http, toast) {

    function call(url) {
      var rapi = 'https://readability.com/api/content/v1/parser?url=' + url + '&token=b727165def07f9d405d194498ba5e3df21c87535&callback=JSON_CALLBACK';
      return $http.jsonp(rapi)
        .error(function () {
          toast.show('something went wrong');
        });
    }

    return {
      call: call
    };

  });

