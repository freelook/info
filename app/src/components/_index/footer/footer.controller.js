'use strict';

angular
  .module('freelook.info')
  .controller('footer.ctrl', function ($location, url, locale) {

    var vm = this;
    vm.donate = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RFP3HDDXV2NJS';
    vm.company = $location.path() !== '/company' ? url.href('company') : url.href('');
    vm.locale = locale.get();

  });


