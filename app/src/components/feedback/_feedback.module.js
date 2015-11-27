(function () {
  'use strict';

  window.i18n.ru.feedback = {};
  window.i18n.en.feedback = {};

  angular
    .module('fli.feedback', [])
    .config(function ($routeProvider) {

      // Routes config
      $routeProvider
        .when('/feedback', {
          templateUrl: 'components/feedback/feedback.html',
          controller: 'feedback.ctrl',
          controllerAs: 'feedback'
        });

    });

}());
