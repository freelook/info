'use strict';
angular
  .module('fli.search')
  .factory('promo', function (api, url) {

    function click(_item) {
      if (_item && _item.id) {
        url.link(api.promo('click?id=' + _item.id));
      }
    }

    return {
      click: click
    };

  });
