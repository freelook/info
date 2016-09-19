'use strict';

angular
  .module('fli.widget')
  .factory('WIDGETS',
  function($q, storage) {

    var demoWidget = {
      name: 'demo',
      title: 'Demo',
      description: 'Demo widget',
      style: 'body{ background:#ccc;}',
      template: '<h3 ng-bind="ctrl.total"></h3><button ng-click="ctrl.update()">Update</button>',
      service: function() {
        return {log: console.log};
      },
      controller: function(service, config) {
        var ctrl = this;
        ctrl.total = config.init.value || 0;
        ctrl.update = function() {
          ctrl.total += 1;
          service.log(ctrl.total);
        };
      },
      config: {
        init: {
          title: 'Init value',
          type: 'number'
        }
      }
    };

    post(demoWidget);

    function get() {
      return $q.when(storage.get('widgets', []));
    }

    function one(name) {
      return get().then(function(widgets) {
        return widgets.find(function(item) {
          return item.name === name;
        });
      });
    }

    function post(model) {
      get().then(function(widgets) {
        widgets.push(model);
        storage.set('widgets', widgets, storage.parser.func);
        return widgets;
      });
    }

    return {
      get: get,
      one: one,
      post: post
    };

  });
