'use strict';

angular
  .module('fli.core')
  .factory('metrica', function ($http) {
    return {
      init: function () {
        $http.get('https://mc.yandex.ru/watch/36744405', {cache: false});
      }
    };
  })
  .controller('metrica.controller', function (url) {
    var vm = this;
    vm.link = url.link;
  })
  .directive('fliMetrica', function () {
    return {
      controller: 'metrica.controller',
      controllerAs: 'metrica',
      templateUrl: 'components/core/analytics/metrica/metrica.html'
    };
  });
