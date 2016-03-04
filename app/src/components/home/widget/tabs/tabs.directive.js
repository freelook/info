'use strict';
angular
  .module('fli.home')
  .directive('fliHomeWidgetTabs', function () {
    return {
      templateUrl: 'components/home/widget/tabs/tabs.html'
    };
  });
