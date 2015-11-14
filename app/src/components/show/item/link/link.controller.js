'use strict';

angular
  .module('fli.show')
  .controller('show.item.link.ctrl',
  function ($scope, yandex) {

    var vm = this;

    vm.setImg = function (_img) {
      $scope.showItem.post.img = _img;
    };

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
