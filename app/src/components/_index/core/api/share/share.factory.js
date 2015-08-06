'use strict';
angular
  .module('freelook.info')
  .factory('share', function ($rootScope, facebook, google, url) {

    var connector = facebook.share;

    function _url(_href) {
      if (_href) {

        $rootScope.fli.view = 'components/_index/core/api/share/share.view.html';
        //google.url.insert(_href)
        //  .success(function (res) {
        //    if (res && res.id) {
        //      url.location(connector(res.id));
        //    }
        //  });
      }
    }

    return {
      url: _url
    };

  });


