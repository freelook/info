'use strict';

angular
  .module('fli.search')
  .controller('search.result.audio.ctrl',
  function ($scope, vk, lucky, CONFIG) {

    var vm = this;
    vm.results = [];

    vm.getTitle = function (index) {
      var song = vm.results[index];
      return song ? song.artist + ' - ' + song.title : '';
    };

    vm.seekPercentage = function ($event) {
      var percentage = $event.offsetX / $event.target.offsetWidth;
      if (percentage <= 1) {
        return percentage;
      }
      return 0;
    };

    function setResult(audio) {
      var results = audio.response || [];
      vm.results = angular.copy(results).splice(1).map(function (song) {
        song.src = CONFIG.API.URL + 'proxy?url=' + decodeURIComponent(song.url);
        return song;
      });
    }

    vk.audio($scope.fli.route.input || lucky.word)
      .success(setResult);

  });

