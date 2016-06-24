'use strict';
angular
  .module('freelook.info')
  .factory('instagram', function ($q, $parse, api, INSTAGRAM_API) {

    function imageByTag(q) {
      var defer = $q.defer();
      _point(['/explore/tags', q, '?__a=1'].join('/'))
        .success(function (res) {
          var top = $parse('tag.top_posts.nodes')(res) || [],
            media = $parse('tag.media.nodes')(res) || [];
          defer.resolve(top.concat(media));
        })
        .error(function (err) {
          defer.reject(err);
        });
      return defer.promise;
    }

    function imageByUserId(id) {
      return _image(encodeURIComponent('users/' + id + '/media/recent?fli=1'));
    }

    function mediaByCode(code) {
      return _point(['/p', code, '?__a=1'].join('/'));
    }

    function _point(end) {
      return api.proxy(INSTAGRAM_API.URL + end);
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

    function people(q) {
      var point = encodeURIComponent('users/search?q=' + q);
      return api.instagram(point);
    }

    function link(_id) {
      var id = _id || '';
      return [INSTAGRAM_API.URL, id].join('/');
    }

    return {
      imageByTag: imageByTag,
      imageByUserId: imageByUserId,
      mediaByCode: mediaByCode,
      user: user,
      people: people,
      link: link
    };

  })
  .constant('INSTAGRAM_API', {
    URL: 'https://www.instagram.com'
  });

