'use strict';
angular
  .module('fli.home')
  .directive('fliHomeWidgetUser', function () {
    return {
      controller: 'home.widget.user.ctrl',
      controllerAs: 'userCtrl',
      templateUrl: 'components/home/widget/user/user.html'
    };
  });

