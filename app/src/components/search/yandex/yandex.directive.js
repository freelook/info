'use strict';
angular.module('fli.search')
  .directive('fliYandexSearch', function() {
    return {
      controller: 'YandexCtrl',
      templateUrl: 'components/search/yandex/yandex.html'
    };
  });
