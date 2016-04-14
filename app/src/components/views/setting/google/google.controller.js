'use strict';

angular
  .module('fli.views')
  .controller('setting.google.ctrl',
  function (user, url, google) {

    var vm = this,
      userGoogleData = user.data('google') || {};

    function setResult(res) {
      vm.items = res.items || [];
    }

    if (userGoogleData.id && userGoogleData.token) {
      google.data('people/me/activities/public', userGoogleData.token).success(setResult);
    }

  });

