'use strict';

angular
  .module('fli.views')
  .controller('tabs.setting.ctrl',
  function ($scope, user, auth) {

    var vm = this;

    vm.logOut = user.logOut;
    vm.logIn = user.logIn;

    vm.img = function (id, provider) {
      return auth.providers[provider].img(id);
    };

    vm.providers = Object.keys(auth.providers);

    user.init();

  });
