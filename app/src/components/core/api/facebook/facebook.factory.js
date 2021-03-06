'use strict';
angular
  .module('freelook.info')
  .factory('facebook',
  function ($http, $rootScope, $q, api, url, platform, CONFIG, FB_API) {

    var APP_ID = CONFIG.API.FB.ID;

    function logIn() {
      var redirectUri = CONFIG.SITE.ORIGIN + 'token?platform=' + platform.name();
      return url.link('https://www.facebook.com/dialog/oauth?client_id=' + APP_ID + '&redirect_uri=' + redirectUri + '&scope=user_posts&response_type=token');
    }

    function share(_href, item) {
      var _item = item || {},
        _img = item.img || '',
        _title = _item.title || '',
        _description = _item.content || '';
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

    function user(_id) {
      var point = encodeURIComponent(_id + '?fli=1');
      return api.facebook(point);
    }

    function wall(_id) {
      var point = encodeURIComponent(_id + '/feed?fli=1');
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

    function img(user, type) {
      var _id = user.id || user,
        _type = type || 'normal';
      return FB_API + _id + '/picture?type=' + _type;
    }

    function link(_id) {
      var id = _id || '';
      return 'https://www.facebook.com/' + id;
    }

    function data(point, token) {
      if (point && token) {
        return $http.get(FB_API + point + '?access_token=' + token);
      }
      return $q.reject();
    }

    function me(token) {
      return data('me', token);
    }

    return {
      logIn: logIn,
      share: share,
      user: user,
      wall: wall,
      pages: pages,
      people: people,
      events: events,
      img: img,
      link: link,
      data: data,
      me: me
    };

  })
  .constant('FB_API', 'https://graph.facebook.com/');


