'use strict';
angular
  .module('fli.home')
  .directive('fliHomeWidgetTrends', function () {
    return {
      controller: 'home.widget.trends.ctrl',
      controllerAs: 'hotTrends',
      templateUrl: 'components/home/widget/trends/trends.html'
    };
  });

