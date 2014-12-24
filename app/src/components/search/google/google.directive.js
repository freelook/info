'use strict';
angular.module('fli.search')
.directive('fliGoogleSearch', function() {
    return {
      controller: 'GoogleCtrl',
      templateUrl: 'components/search/google/google.html'
    };
  });
