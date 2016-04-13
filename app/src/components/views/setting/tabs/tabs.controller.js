'use strict';

angular
  .module('fli.views')
  .controller('tabs.setting.ctrl',
  function ($scope, user, auth) {

    var vm = this;

    vm.logOut = user.logOut;
    vm.logIn = user.logIn;

    vm.img = function (user, provider) {
      return auth.providers[provider].img(user);
    };

    vm.providers = Object.keys(auth.providers);

    user.init();

  });
