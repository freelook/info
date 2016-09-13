'use strict';

angular
  .module('fli.widget')
  .factory('WIDGETS',
  function($q) {

    var mockWidgets = [
      {
        name: 'links',
        title: 'Links',
        description: 'Displays a list of links',
        style: 'body{ background:#ccc;}',
        template: '<h3 ng-bind="ctrl.total"></h3><button ng-click="ctrl.update()">Update</button>',
        service: function() {
          return {log: console.log};
        },
        controller: function(service, config) {
          var ctrl = this;
          ctrl.total = config.init.value;
          ctrl.update = function() {
            ctrl.total += 1;
            service.log(ctrl.total);
          };
        },
        config: {
          init: {
            title: 'Init value',
            type: 'number',
            value: 1
          }
        }
      }
    ];

    function get() {
      return $q.when(angular.copy(mockWidgets));
    }

    function one() {
      return $q.when(angular.copy(mockWidgets[0]));
    }

    return {
      get: get,
      one: one
    };

  });
