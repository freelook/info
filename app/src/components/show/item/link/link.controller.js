'use strict';

angular
  .module('fli.show')
  .controller('show.item.link.ctrl',
  function ($scope, rich) {

    function _setItem(_item) {
      $scope.showItem.post = _item || {};

      //{
      //  url: item.url,
      //  img: item.img ? item.img[0] : '',
      //  title: item.title,
      //  content: item.content
      //}
    }

    rich.get($scope.fli.route.input)
      .then(_setItem)
      .catch(_setItem);

  });
