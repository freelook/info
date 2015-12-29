'use strict';

angular
  .module('fli.uix')
  .controller('help.ctrl',
  function ($scope, $translate, locale, ABOUT_URL) {

    var vm = this,
      category = $translate.instant('uix.help.guide');

    vm.link = ABOUT_URL + 'category/' + category + '/?lang=' + locale.getLng();

  });
