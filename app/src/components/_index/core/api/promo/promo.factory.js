'use strict';
angular
  .module('fli.search')
  .factory('promo', function (api, url, user) {

    function click(_item) {
      var id = _item.id,
        token = user.getSessionToken();
      if (id && token) {
        url.link(api.promo('click?id=' + id + '&token=' + token));
      }
    }

    return {
      click: click
    };

  });
