'use strict';

angular
  .module('fli.search')
  .controller('search.result.places.google.ctrl',
  function ($routeParams, google) {

    var vm = this;

    vm.markers = [];

    function setPlaces(res) {
      vm.markers = (res.results || []).map(function (marker) {
        marker.latitude = marker.geometry.location.lat;
        marker.longitude = marker.geometry.location.lng;
        return marker;
      });
    }

    if ($routeParams.input) {
      google.places($routeParams.input).success(setPlaces);
    }

  });

