'use strict';

angular
  .module('freelook.info')
  .controller('apps.ctrl',
  function () {

    var vm = this;
    vm.chrome = 'https://chrome.google.com/webstore/detail/freelookinfo/jlpjaecnenjbpkbcpnocbeibjokkbnhj';
    vm.android = 'https://play.google.com/store/apps/details?id=info.freelook';

  });

