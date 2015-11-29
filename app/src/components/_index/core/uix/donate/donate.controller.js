'use strict';

angular
  .module('freelook.info')
  .controller('donate.ctrl',
  function () {

    var vm = this;
    vm.url = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RFP3HDDXV2NJS';

  });

