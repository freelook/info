'use strict';

angular
  .module('freelook.info')
  .controller('locale.panel.ctrl',
  function (locale, url) {

    var vm = this;
    vm.locales = locale.locales;

    vm.href = function (locale) {
      return url.href('', {lng: locale}, true);
    };

  });

