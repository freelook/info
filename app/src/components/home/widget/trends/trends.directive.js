'use strict';
angular
  .module('fli.home')
  .directive('fliHomeWidgetTrends', function () {
    return {
      controller: 'home.widget.trends.ctrl',
      controllerAs: 'trends',
      templateUrl: 'components/home/widget/trends/trends.html'
    };
  });

