'use strict';
angular
  .module('fli.home')
  .directive('fliHomeWidget', function () {
    return {
      controller: 'home.widget.ctrl',
      controllerAs: 'widget',
      templateUrl: 'components/home/widget/widget.html'
    };
  });
