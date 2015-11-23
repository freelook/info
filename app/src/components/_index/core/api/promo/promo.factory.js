'use strict';
angular
  .module('fli.search')
  .factory('promo', function ($route, api, io, url) {

    var handlers = {
      update: function () {
        $route.reload();
      },
      noop: angular.noop
    };

    function init() {
      io.on('API', function (_handler) {
        var handler = handlers[_handler] || handlers.noop;
        handler();
      });
    }

    function click(_item) {
      if (_item && _item.id) {
        url.link(api.promo('click?id=' + _item.id));
      }
    }

    return {
      init: init,
      click: click
    };

  });
