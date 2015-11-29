'use strict';

angular
  .module('fli.feedback')
  .controller('feedback.comments.ctrl',
  function ($timeout, locale, url, FB, CONFIG) {

    var vm = this;
    vm.count = 5;
    vm.href = url.href('feedback?', {l: locale.getLng()}, false, CONFIG.PRODUCTION);

    FB.xfbml();

  });

