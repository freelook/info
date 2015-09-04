'use strict';
angular
  .module('freelook.info')
  .factory('instagram', function ($q, api) {

    function image(q) {
      var point = 'search?q=' + encodeURIComponent('tags/' + q + '/media/recent?fli=1');
      return imageByPromise(api.instagram(point));
    }

    function media(id) {
      var point = 'search?q=' + encodeURIComponent('media/shortcode/' + id + '?fli=1');
      return api.instagram(point);
    }

    function mediaByUserId(id) {
      var point = 'search?q=' + encodeURIComponent('users/' + id + '/media/recent?fli=1');
      return imageByPromise(api.instagram(point));
    }

    function user(url) {
      var defer = $q.defer();

      _getId(url)
        .then(function (_id) {
          userById(_id)
            .success(function (usr) {
              return defer.resolve(usr);
            })
            .error(function (err) {
              return defer.reject(err);
            });
        })
        .catch(function (err) {
          return defer.reject(err);
        });

      return defer.promise;
    }

    function imageByPromise(promise) {
      var defer = $q.defer();
      promise
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

    function _getId(url) {
      var defer = $q.defer();
      api.proxy(url)
        .success(function (html) {
          var _html = html || '',
            id = _html.match(/"id":"(.+?)"/i)[1] || '';
          return defer.resolve(id);
        })
        .error(function (err) {
          return defer.reject(err);
        });

      return defer.promise;
    }

    function userById(id) {
      var point = 'search?q=' + encodeURIComponent('users/' + id + '?fli=1');
      return api.instagram(point);
    }

    return {
      image: image,
      media: media,
      mediaByUserId: mediaByUserId,
      user: user
    };

  });
