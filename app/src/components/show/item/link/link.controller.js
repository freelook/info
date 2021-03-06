'use strict';

angular
  .module('fli.show')
  .controller('show.item.link.ctrl',
  function ($scope, rich) {

    function _setItem(_item) {
      $scope.showItem.item = _item || {};
    }

    rich.get($scope.fli.route.input)
      .then(_setItem)
      .catch(function () {
        _setItem();
      });

  });
