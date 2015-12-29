'use strict';

angular
  .module('freelook.info')
  .controller('footer.ctrl', function (nav, url, locale) {

    var vm = this;
    vm.showLocalePanel = false;

    vm.about = 'http://about.freelook.info/?lang=' + locale.getLng();
    vm.localeCode = locale.getCode();

    vm.feedback = function () {
      nav.go('feedback');
    };

    vm.toggleLocalePanel = function () {
      vm.showLocalePanel = !vm.showLocalePanel;
    };

  });


