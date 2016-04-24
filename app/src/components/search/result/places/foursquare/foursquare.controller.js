'use strict';

angular
  .module('fli.search')
  .controller('search.result.places.foursquare.ctrl',
  function ($routeParams, foursquare) {

    var vm = this;

    vm.markers = [];

    function setPlaces(res) {
      vm.markers = (res.response.venues || []).map(function (marker) {
        marker.latitude = marker.location.lat;
        marker.longitude = marker.location.lng;
        return marker;
      });
    }

    if ($routeParams.input) {
      foursquare.places($routeParams.input).success(setPlaces);
    }

  });

