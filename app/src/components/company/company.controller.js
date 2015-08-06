'use strict';

angular
  .module('fli.company')
  .controller('company.ctrl',
  function ($rootScope, $location, $routeParams, $mdMedia, DEFAULT_TITLE, DEFAULT_DESCRIPTION) {

    $location.search({}).replace();

    var vm = this;

    $rootScope.fli.route = $routeParams || {};
    $rootScope.fli.media = $mdMedia;
    $rootScope.fli.title = DEFAULT_TITLE;
    $rootScope.fli.description = DEFAULT_DESCRIPTION;
    $rootScope.fli.icon = 'heartbeat';
    $rootScope.fli.view = '';

    vm.cio = {
      img: 'https://graph.facebook.com/100002976489519/picture?type=large',
      link: 'https://ua.linkedin.com/in/kostrub'
    };

  });
