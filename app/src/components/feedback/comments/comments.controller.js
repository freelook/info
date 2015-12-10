'use strict';

angular
  .module('fli.feedback')
  .controller('feedback.comments.ctrl',
  function () {

    var vm = this;
    vm.mail = 'mail@freelook.info';
    vm.href = 'mailto:mail@freelook.info?subject=[FLI:feedback]';

  });

