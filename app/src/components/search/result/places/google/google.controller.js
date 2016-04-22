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
    vm.window = {
      template: 'components/search/result/places/google/map/window.html'
    };

    vm.click = function (marker, event, place) {
      vm.window.place = place;
    };

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

