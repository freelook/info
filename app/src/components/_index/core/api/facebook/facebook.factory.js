'use strict';
angular
  .module('freelook.info')
  .factory('facebook', function () {

    function share(_href) {
      var fapi = 'https://www.facebook.com/dialog/share?' +
        'app_id=846841298681206' +
        '&display=popup' +
        '&redirect_uri=http://freelook.info' +
        '&href=' + _href;
      return fapi;
    }

    return {
      share: share
    };

  });


