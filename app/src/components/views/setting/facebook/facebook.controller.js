'use strict';

angular
  .module('fli.views')
  .controller('setting.facebook.ctrl',
  function (user, url, facebook) {

    var vm = this,
      userFacebookData = user.data('facebook') || {};

    vm.img = function (_link) {
      var href = _link || '',
        query = href.split('?')[1];
      return url.decode(url.qByName('url', query) || href);
    };

    function setResult(fb) {
      vm.results = fb.data || [];
    }

    if (userFacebookData.token) {
      facebook.data('me/feed', userFacebookData.token).success(setResult);
    }

  });

