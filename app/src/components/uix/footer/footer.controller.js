'use strict';

angular
  .module('fli.uix')
  .controller('footer.ctrl', function (nav, url, locale, ABOUT_URL) {

    var vm = this;
    vm.showLocalePanel = false;

    vm.about = ABOUT_URL + '?lang=' + locale.getLng();
    vm.localeCode = locale.init();

    vm.feedback = function () {
      nav.go('feedback');
    };

    vm.toggleLocalePanel = function () {
      vm.showLocalePanel = !vm.showLocalePanel;
    };

  })
  .constant('ABOUT_URL', 'http://about.freelook.info/');


