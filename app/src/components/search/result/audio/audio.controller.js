'use strict';

angular
  .module('fli.search')
  .controller('search.result.audio.ctrl',
  function ($scope, vk, CONFIG) {

    var vm = this;
    vm.results = [];

    vm.getTitle = function (index) {
      var song = vm.results[index];
      return song ? song.artist + ' - ' + song.title : '';
    };

    function setResult(audio) {
      var results = audio.response || [];
      vm.results = angular.copy(results).splice(1).map(function (song) {
        song.src = CONFIG.API.URL + 'proxy?url=' + decodeURIComponent(song.url);
        return song;
      });
    }

    if ($scope.fli.route.input) {
      vk.audio($scope.fli.route.input)
        .success(setResult);
    }

  });

