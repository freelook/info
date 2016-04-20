'use strict';

angular
  .module('fli.search')
  .controller('search.result.places.google.ctrl',
  function ($routeParams, google) {

    var vm = this;
    vm.map = {
      center: {
        latitude: 40.1451,
        longitude: -99.6680
      },
      zoom: 3
    };
    vm.markers = [];

    function setPlaces(res) {
      vm.markers = (res.results || []).map(function (marker) {
        return {
          id: marker.id,
          latitude: marker.geometry.location.lat,
          longitude: marker.geometry.location.lng
        };
      });
    }

    if ($routeParams.input) {
      google.places($routeParams.input).success(setPlaces);
    }

  });

