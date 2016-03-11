'use strict';
angular
  .module('fli.home')
  .directive('fliHomeWidgetStars', function () {
    return {
      controller: 'home.widget.stars.ctrl',
      controllerAs: 'stars',
      templateUrl: 'components/home/widget/stars/stars.html'
    };
  });

