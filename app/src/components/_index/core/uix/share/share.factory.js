'use strict';
angular
  .module('freelook.info')
  .factory('share', function ($rootScope, facebook, google, url) {

    var _item = {}, _href = '',
      connectors = {
        facebook: facebook.share
      };

    function _url(href, config) {
      if (href && config) {
        _item = config;
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

    function item() {
      return _item;
    }

    return {
      url: _url,
      run: run,
      item: item
    };

  });


