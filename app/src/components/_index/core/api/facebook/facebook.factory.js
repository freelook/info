'use strict';
angular
  .module('freelook.info')
  .factory('facebook', function () {
    var APP_ID = '846841298681206';
    function share(_href) {
      var fapi = 'https://www.facebook.com/dialog/share?' +
        'app_id=' + APP_ID +
        '&display=popup' +
        '&redirect_uri=http://freelook.info' +
        '&href=' + _href;
      return fapi;
    }

    return {
      share: share
    };

  });


