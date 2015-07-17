'use strict';
angular
  .module('fli.home')
  .directive('fliHomeWidgetLooks', function () {
    return {
      controller: 'home.widget.looks.ctrl',
      controllerAs: 'looks',
      templateUrl: 'components/home/widget/looks/looks.html'
    };
  });

