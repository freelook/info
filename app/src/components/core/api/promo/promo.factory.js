'use strict';
angular
  .module('fli.search')
  .factory('promo', function (index, api, io, url) {

    var handlers = {
      update: function () {
        index.reload();
      },
      noop: angular.noop
    };

    function init() {
      io.on('API', function (_handler) {
        var handler = handlers[_handler] || handlers.noop;
        handler();
      });
    }

    function click($key) {
      if ($key) {
        url.link(api.promo('click?id=' + $key));
      }
    }

    return {
      init: init,
      click: click
    };

  });
