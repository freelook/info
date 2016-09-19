/**
 * The widget service provide helper functions to render widgets and their content.
 */
angular
  .module('fli.widget')
  .service('widget', function($q, WIDGETS) {
    'use strict';

    var widgetTemplate = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>{{name}}</title><style>{{style}}</style></head><body ng-app="{{name}}" ng-controller="controller as ctrl">{{template}}<script src="https://code.angularjs.org/1.5.7/angular.min.js"></script><script>angular.module(\'{{name}}\', []).service(\'service\', {{service}}).controller(\'controller\', {{controller}}).value(\'config\', {{config}});</script></body></html>';

    function render(model) {
      var defer = $q.defer(),
        template = widgetTemplate
          .replace(/{{name}}/g, (model.name || 'widget').toString())
          .replace(/{{style}}/g, (model.style || '').toString())
          .replace(/{{template}}/g, (model.template || '').toString())
          .replace(/{{service}}/g, (model.service || angular.noop).toString())
          .replace(/{{controller}}/g, (model.controller || angular.noop).toString())
          .replace(/{{config}}/g, JSON.stringify(model.config || {}));

      defer.resolve(template);
      return defer.promise;
    }

    function loadAll() {
      return WIDGETS.get();
    }

    function loadOne(name) {
      return WIDGETS.one(name);
    }

    function save(model) {
      WIDGETS.post(model);
    }

    return {
      render: render,
      loadAll: loadAll,
      loadOne: loadOne,
      save: save
    };

  });
