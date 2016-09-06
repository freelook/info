/**
 * The widget service provide helper functions to render widgets and their content.
 */
angular.module('fli.board')
  .service('widgetService', function($q) {
    'use strict';

    var template = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>{{name}}</title><style>{{style}}</style></head><body ng-app="{{name}}" ng-controller="controller as ctrl">{{template}}<script src="https://code.angularjs.org/1.5.7/angular.min.js"></script><script>angular.module(\'{{name}}\', []).service(\'service\', {{service}}).controller(\'controller\', {{controller}});</script></body></html>';

    function render(widget) {
      var defer = $q.defer();

      var tpl = template
        .replace(/{{name}}/g, '' + widget.name)
        .replace(/{{style}}/g, '' + widget.style)
        .replace(/{{template}}/g, '' + widget.template)
        .replace(/{{service}}/g, '' + widget.service)
        .replace(/{{controller}}/g, '' + widget.controller);

      defer.resolve(tpl);

      return defer.promise;
    }

    return {
      render: render
    };

  });
