'use strict';
angular
  .module('fli.home')
  .directive('fliHomeWidgetNews', function () {
    return {
      templateUrl: 'components/home/widget/news/news.html'
    };
  });

