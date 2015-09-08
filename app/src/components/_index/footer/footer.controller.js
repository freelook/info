'use strict';

angular
  .module('freelook.info')
  .controller('footer.ctrl', function ($location, url, locale) {

    var vm = this;
    vm.showLocalePanel = false;
    vm.donate = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RFP3HDDXV2NJS';
    vm.company = $location.path() !== '/company' ? url.href('company?', {l: locale.getCode()}) : url.href('?', {l: locale.getCode()});
    vm.localeCode = locale.getCode();

    vm.toggleLocalePanel = function () {
      vm.showLocalePanel = !vm.showLocalePanel;
    };

    var editorExtensionId = 'hebeffpnegfapnbacgikegnfibflcghh';

    window.chrome.runtime.sendMessage(editorExtensionId, {do: 'do'},
      function (res) {
        console.log(res);
      });

  });


