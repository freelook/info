'use strict';
angular
  .module('freelook.info')
  .factory('instagram', function ($q, api) {

    function _search(q) {
      var point = 'search?q=' + encodeURIComponent('tags/' + q + '/media/recent?fli=1');
      return api.instagram(point);
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

    function media(id) {
      var point = 'search?q=' + encodeURIComponent('media/shortcode/' + id + '?fli=1');
      return api.instagram(point);
    }

    return {
      image: image,
      media: media
    };

  });
