'use strict';
angular
  .module('freelook.info')
  .factory('facebook',
  function ($http, $rootScope, $window, $q, api, url, FB, CONFIG, FB_API) {

    var APP_ID = CONFIG.API.FB.ID;

    function init() {
      FB.init();
    }

    function logIn(_config) {
      var config = _config || {},
        redirectUri = config.redirectUri || CONFIG.SITE.ORIGIN + 'token';
      return url.location('https://www.facebook.com/dialog/oauth?client_id=' + APP_ID + '&redirect_uri=' + redirectUri + '&response_type=token&display=popup');
    }

    function share(_href, item) {
      var _item = item || {},
        _img = item.img || '',
        _title = _item.titleNoFormatting || _item.title || '',
        _description = _item.contentNoFormatting || _item.content || '';
      return 'https://www.facebook.com/dialog/feed?' +
        'app_id=' + APP_ID +
        '&display=page' +
        '&redirect_uri=' +
        url.href('?', {input: $rootScope.fli.route.input}, false, CONFIG.PRODUCTION) +
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

    function _getId(_url) {
      var _id = url.extract('*/app_scoped_user_id/:id(/)', _url).id;
      if (_id) {
        return $q.when(_id);
      }

      var defer = $q.defer();
      api.proxy(_url)
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

    function userById(_id) {
      var point = encodeURIComponent(_id + '?fli=1');
      return api.facebook(point);
    }

    function pages(q) {
      var point = encodeURIComponent('search?q=' + q + '&type=page&limit=24');
      return api.facebook(point);
    }

    function people(q) {
      var point = encodeURIComponent('search?q=' + q + '&type=user&limit=24&fields=id,name,about,gender,link');
      return api.facebook(point);
    }

    function events(q) {
      var point = encodeURIComponent('search?q=' + q + '&type=event&limit=24&fields=id,name,description,location,timezone');
      return api.facebook(point);
    }

    function img(id, type) {
      var _type = type || 'normal';
      return FB_API + id + '/picture?type=' + _type;
    }

    function link(_id) {
      var id = _id || '';
      return 'https://www.facebook.com/' + id;
    }

    return {
      init: init,
      logIn: logIn,
      share: share,
      user: user,
      pages: pages,
      people: people,
      events: events,
      img: img,
      link: link
    };

  })
  .constant('FB_API', 'https://graph.facebook.com/');


