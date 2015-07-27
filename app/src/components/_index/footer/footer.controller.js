'use strict';

angular
  .module('freelook.info')
  .controller('footer.ctrl', function (url) {

    var vm = this;
    vm.donate = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RFP3HDDXV2NJS';
    vm.company = url.href('company');

  });


