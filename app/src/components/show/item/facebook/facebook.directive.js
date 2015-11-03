'use strict';
angular.module('fli.show')
  .directive('fliShowItemFacebook', function () {
    return {
      controller: 'show.item.facebook.ctrl',
      controllerAs: 'facebookItem',
      templateUrl: 'components/show/item/facebook/facebook.html'
    };
  });
