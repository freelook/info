'use strict';
angular
  .module('freelook.info')
  .factory('facebook',
  function ($http, $rootScope, $q, api, url, CONFIG) {

    var APP_ID = CONFIG.FB.ID;

    function share(_href, item) {
      var _item = item || {},
        _img = $rootScope.fli.fix(item.img) || '',
        _title = _item.titleNoFormatting || _item.title || '',
        _description = _item.contentNoFormatting || _item.content || '';
      return 'https://www.facebook.com/dialog/feed?' +
        'app_id=' + APP_ID +
        '&display=page' +
        '&redirect_uri=' +
        url.href('search?', {input: $rootScope.fli.route.input}, false, CONFIG.PRODUCTION) +
        '&link=' + _href +
        '&name=' + _title +
        '&caption=FLI' +
        '&description=' + _description +
        '&picture=' + _img;
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
          var _html = html || '',
            match = _html.match(/profile_id=(.+?)&/i) || [],
            id = match[1] || '';
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


