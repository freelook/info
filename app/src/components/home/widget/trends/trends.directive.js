'use strict';
angular
  .module('fli.home')
  .directive('fliHomeWidgetTrends', function () {
    return {
      templateUrl: 'components/home/widget/trends/trends.html'
    };
  });

