'use strict';

angular
  .module('fli.show')
  .controller('show.item.link.ctrl',
  function ($scope, yandex) {

    yandex.rich(decodeURIComponent($scope.fli.route.input))
      .success(function (_item) {
        var item = _item || {};
        $scope.showItem.post = {
          url: item.url,
          img: item.img ? item.img[0] : '',
          title: item.title,
          content: item.content
        };
      });

  });
