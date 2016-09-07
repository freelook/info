/**
 * The widget service provide helper functions to render widgets and their content.
 */
angular
  .module('fli.widget')
  .service('widgetService', function($q) {
    'use strict';

    var widgetTemplate = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>{{name}}</title><style>{{style}}</style></head><body ng-app="{{name}}" ng-controller="controller as ctrl">{{template}}<script src="https://code.angularjs.org/1.5.7/angular.min.js"></script><script>angular.module(\'{{name}}\', []).service(\'service\', {{service}}).controller(\'controller\', {{controller}}).value(\'config\', {{config}});</script></body></html>';

    function render(model, type) {
      var defer = $q.defer(),
        modelType = model[type] || {},
        template = widgetTemplate
          .replace(/{{name}}/g, (model.name || 'widget').toString())
          .replace(/{{style}}/g, (modelType.style || '').toString())
          .replace(/{{template}}/g, (modelType.template || '').toString())
          .replace(/{{service}}/g, (modelType.service || angular.noop).toString())
          .replace(/{{controller}}/g, (modelType.controller || angular.noop).toString())
          .replace(/{{config}}/g, JSON.stringify(model.config || {}));

      defer.resolve(template);
      return defer.promise;
    }

    return {
      render: render
    };

  });
