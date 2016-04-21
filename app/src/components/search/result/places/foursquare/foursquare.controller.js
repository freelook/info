'use strict';

angular
  .module('fli.search')
  .controller('search.result.places.foursquare.ctrl',
  function ($routeParams, foursquare) {

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
      vm.markers = (res.response.venues || []).map(function (marker) {
        return {
          id: marker.id,
          latitude: marker.location.lat,
          longitude: marker.location.lng
        };
      });
    }

    if ($routeParams.input) {
      foursquare.places($routeParams.input).success(setPlaces);
    }

  });

