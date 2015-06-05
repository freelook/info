'use strict';

angular
  .module('fli.look')
  .controller('look.content.youtube.user.ctrl',
  function ($rootScope, $scope, youtube, CONFIG, url) {

    var vm = this,
      userId = url.extract('/user/:id', $scope.site.pathname).id;

    youtube
      .user(userId)
      .then(function (results) {
        vm.results = results;
      });

    vm.href = function (url) {
      return CONFIG.ORIGIN + 'look?input=' + $scope.fli.route.input + '&url=' + url;
    };

    vm.watchUrl = youtube.watchUrl;

  });



