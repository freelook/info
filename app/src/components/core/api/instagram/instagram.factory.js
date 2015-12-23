'use strict';
angular
  .module('freelook.info')
  .factory('instagram', function ($q, api) {

    function imageByTag(q) {
      return _image(encodeURIComponent('tags/' + q + '/media/recent?fli=1'));
    }

    function imageByUserId(id) {
      return _image(encodeURIComponent('users/' + id + '/media/recent?fli=1'));
    }

    function _image(point) {
      var defer = $q.defer();
      api.instagram(point)
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

    function mediaByCode(code) {
      var point = encodeURIComponent('media/shortcode/' + code + '?fli=1');
      return api.instagram(point);
    }

    function user(url) {
      var defer = $q.defer();

      _getId(url)
        .then(function (_id) {
          if (_id) {
            return userById(_id)
              .success(function (usr) {
                return defer.resolve(usr);
              })
              .error(function (err) {
                return defer.reject(err);
              });
          }
          return defer.reject();
        })
        .catch(function (err) {
          return defer.reject(err);
        });

      return defer.promise;
    }

    function userById(id) {
      var point = encodeURIComponent('users/' + id + '?fli=1');
      return api.instagram(point);
    }

    function _getId(url) {
      var defer = $q.defer();
      api.proxy(url)
        .success(function (html) {
          var _html = html || '',
            match = _html.match(/"id":"(.+?)"/i) || [],
            id = match[1] || '';
          return defer.resolve(id);
        })
        .error(function (err) {
          return defer.reject(err);
        });

      return defer.promise;
    }

    return {
      imageByTag: imageByTag,
      imageByUserId: imageByUserId,
      mediaByCode: mediaByCode,
      user: user
    };

  });
