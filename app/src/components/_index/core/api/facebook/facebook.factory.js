'use strict';
angular
  .module('freelook.info')
  .factory('facebook',
  function ($http, $q, api) {

    var APP_ID = '846841298681206',
      FB_API = 'https://graph.facebook.com/';

    function share(_href) {
      var fapi = 'https://www.facebook.com/dialog/share?' +
        'app_id=' + APP_ID +
        '&display=popup' +
        '&redirect_uri=http://freelook.info' +
        '&href=' + _href;
      return fapi;
    }

    function _picture(_id) {
      return $http.jsonp(FB_API + _id + '/picture?redirect=false&type=large&callback=JSON_CALLBACK');
    }

    function _user(_id) {
      return $http.jsonp(FB_API + _id + '?callback=JSON_CALLBACK');
    }

    function user(_id) {
      return $q.all([_user(_id), _picture(_id)]);
    }

    function pages(q) {
      var point = 'search?q=' + q + '&type=page';
      return api.facebook(point);
    }

    return {
      share: share,
      user: user,
      pages: pages
    };

  });


