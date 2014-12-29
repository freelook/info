'use strict';
angular
  .module('fli.search')
  .factory('Yandex', function ($q) {

    function search(q) {
      if (q) {
        var defer = $q.defer(),
          yapi = 'https://yandex.com/sitesearch?text=' + q + '&searchid=2192226&frame=1';

        defer.resolve(yapi);
        return defer.promise;
      }
    }

    return {
      search: search
    };

  });

