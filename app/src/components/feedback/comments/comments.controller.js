'use strict';

angular
  .module('fli.feedback')
  .controller('feedback.comments.ctrl',
  function (locale, url, FB, CONFIG) {

    var vm = this;
    vm.mail = 'mail@freelook.info';
    vm.href = 'mailto:mail@freelook.info?subject=[FLI:feedback]';

    vm.fbCount = 5;
    vm.fbHref = url.href('feedback?', {l: locale.getLng()}, false, CONFIG.PRODUCTION);

    FB.xfbml();

  });

