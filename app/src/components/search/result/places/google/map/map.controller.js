'use strict';

angular
  .module('fli.search')
  .controller('search.result.places.google.map.ctrl',
  function () {

    var vm = this;
    vm.zoom = 3;
    vm.center = {
      latitude: 40.1451,
      longitude: -99.6680
    };
    vm.window = {
      template: 'components/search/result/places/google/map/window.html'
    };

    vm.click = function (marker, event, place) {
      vm.window.place = place;
    };

  });

