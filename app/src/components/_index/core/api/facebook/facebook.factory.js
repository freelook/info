'use strict';
angular
  .module('freelook.info')
  .factory('facebook',
  function ($http, $q, api) {

    var APP_ID = '846841298681206';

    function share(_href) {
      var fapi = 'https://www.facebook.com/dialog/share?' +
        'app_id=' + APP_ID +
        '&display=popup' +
        '&redirect_uri=http://freelook.info' +
        '&href=' + _href;
      return fapi;
    }

    function user(_id) {
      var point = 'search?q=' + encodeURIComponent(_id + '?fli=1');
      return api.facebook(point);
    }

    function pages(q) {
      var point = 'search?q=' + encodeURIComponent('search?q=' + q + '&type=page');
      return api.facebook(point);
    }

    return {
      share: share,
      user: user,
      pages: pages
    };

  })
  .constant('FB_API', 'https://graph.facebook.com/');


