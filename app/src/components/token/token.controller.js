'use strict';

angular
  .module('fli.token')
  .controller('token.ctrl',
  function ($routeParams, $location, token) {

    var access_token = $location.url().split('#access_token=')[1];

    token.send(access_token, $routeParams.platform);

  });
