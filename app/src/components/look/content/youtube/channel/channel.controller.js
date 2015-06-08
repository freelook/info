'use strict';

angular
  .module('fli.look')
  .controller('look.content.youtube.channel.ctrl',
  function ($rootScope, $scope, youtube, CONFIG, url) {

    var vm = this;

    vm.channelId = url.extract('/channel/:id', $scope.site.pathname).id;

    if (vm.channelId) {
      youtube
        .channel(vm.channelId)
        .then(function (results) {
          vm.results = results.data.items;
        });
    }

  });



