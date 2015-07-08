'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultAudio', function () {
    return {
      controller: 'search.result.audio.ctrl',
      controllerAs: 'audio',
      templateUrl: 'components/search/result/audio/audio.html'
    };
  });

