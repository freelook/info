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
        view: {
          style: 'body{ background:#ccc;}',
          template: '<h3 ng-bind="ctrl.total"></h3><button ng-click="ctrl.update()">Update</button>',
          service: function() {
            return {log: console.log};
          },
          controller: function(service, config) {
            var ctrl = this;
            ctrl.total = config.initValue;
            ctrl.update = function() {
              ctrl.total += 1;
              service.log(ctrl.total);
            };
          }
        },
        edit: {
          template: '<span>Init value:</span><input ng-model="ctrl.initValue">',
          controller: function(config) {
            var ctrl = this;
            ctrl.initValue = config.initValue;
            window.addEventListener('message', push, false);
            function push(event) {
              console.log('sent msg');
              config.initValue = ctrl.initValue;
              event.source.postMessage(config, '*');
            }
          }
        }
      }
    ];

    function get() {
      return $q.when(mockWidgets);
    }

    return {
      get: get
    };

  });
