'use strict';
angular
  .module('freelook.info')
  .factory('share', function ($rootScope, facebook, google, url) {

    var _href = '',
      connectors = {
        facebook: facebook.share
      };

    function _url(href) {
      if (href) {
        _href = href;
        $rootScope.fli.view = 'components/_index/core/uix/share/share.view.html';
      }
    }

    function run(connector) {
      google.url.insert(_href)
        .success(function (res) {
          if (res && res.id) {
            url.location(connectors[connector](res.id));
          }
        });
    }

    return {
      url: _url,
      run: run
    };

  });


