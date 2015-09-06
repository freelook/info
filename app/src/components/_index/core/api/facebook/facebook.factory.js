'use strict';
angular
  .module('freelook.info')
  .factory('facebook',
  function ($http, $rootScope, $q, api, url, parser, CONFIG) {

    var APP_ID = '846841298681206';

    function share(_href) {
      var fapi = 'https://www.facebook.com/dialog/share?' +
        'app_id=' + APP_ID +
        '&display=popup' +
        '&redirect_uri=' +
        url.href('search?', {input: $rootScope.fli.route.input}, false, CONFIG.PRODUCTION) +
        '&href=' + _href;
      return fapi;
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

    function userById(_id) {
      var point = encodeURIComponent(_id + '?fli=1');
      return api.facebook(point);
    }

    function pages(q) {
      var point = encodeURIComponent('search?q=' + q + '&type=page');
      return api.facebook(point);
    }

    function _getId(url) {
      var defer = $q.defer();
      api.proxy(url)
        .success(function (html) {
          var dom = parser.parseFromString(html, 'text/html'),
            content = $(dom).find('meta[property="al:android:url"]').attr('content') || '',
            id = content.split('profile/').splice(1)[0] || content.split('?id=').splice(1)[0] || '';
          return defer.resolve(id);
        })
        .error(function (err) {
          return defer.reject(err);
        });

      return defer.promise;
    }

    return {
      share: share,
      user: user,
      pages: pages
    };

  })
  .constant('FB_API', 'https://graph.facebook.com/');


