'use strict';

angular.module('adf')
  .directive('adfWidgetContent', function ($log, $q, widgetService,
                                           $compile, $controller, $injector, dashboard) {

    function renderError($element, msg) {
      $log.warn(msg);
      $element.html(dashboard.messageTemplate.replace(/{}/g, msg));
    }

    function compileWidget($scope, $element, currentScope) {
      var model = $scope.model;
      var content = $scope.content;

      var newScope = currentScope;
      if (!model) {
        renderError($element, 'model is undefined');
      } else if (!content) {
        var msg = 'widget content is undefined, please have a look at your browser log';
        renderError($element, msg);
      } else {
        newScope = renderWidget($scope, $element, currentScope, model, content);
      }
      return newScope;
    }

    function renderWidget($scope, $element, currentScope, model, widget) {
      widgetService.render(widget)
        .then(function (srcdoc) {
          $element.html($('<iframe/>').attr({srcdoc: srcdoc}));
        });
    }

    return {
      replace: true,
      restrict: 'EA',
      transclude: false,
      scope: {
        model: '=',
        content: '='
      },
      link: function ($scope, $element) {
        var currentScope = compileWidget($scope, $element, null);
        $scope.$on('widgetConfigChanged', function () {
          currentScope = compileWidget($scope, $element, currentScope);
        });
        $scope.$on('widgetReload', function () {
          currentScope = compileWidget($scope, $element, currentScope);
        });
      }
    };

  });
