'use strict';

angular
  .module('fli.feedback')
  .controller('feedback.ctrl',
  function ($rootScope, $routeParams, $location, $scope, $translate, index, locale) {

    $location.search({
      l: locale.init($routeParams.l),
      type: $routeParams.type
    })
      .hash('')
      .replace();

    $translate.use(locale.getLng());
    $rootScope.fli.icon = 'comments-o';
    index.init();

    var vm = this;
    vm.donate = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RFP3HDDXV2NJS';

  });
