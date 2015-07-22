'use strict';
angular
  .module('freelook.info')
  .factory('instagram', function ($q, api) {

    function _search(q) {
      return api.instagram('search?q=' + q);
    }

    function image(q) {
      var defer = $q.defer();
      _search(q)
        .success(function (res) {
          var data = res && res.data ? res.data : [];
          return defer.resolve(data.filter(function (el) {
            return el && el.type === 'image';
          }));
        })
        .error(function (res) {
          return defer.reject(res);
        });
      return defer.promise;
    }

    return {
      image: image
    };

  });
