'use strict';

angular
  .module('fli.uix')
  .controller('apps.ctrl',
  function (toast, CONFIG) {

    var vm = this;
    vm.site = CONFIG.PRODUCTION;
    vm.chrome = 'https://chrome.google.com/webstore/detail/freelookinfo/jlpjaecnenjbpkbcpnocbeibjokkbnhj';
    vm.android = 'https://play.google.com/store/apps/details?id=info.freelook';

    vm.hide = function () {
      toast.hide();
    };

  });

