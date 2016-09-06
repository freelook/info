'use strict';

angular.module('fli.widget')
  .directive('fliWidgetContent', function(widgetService) {

    return {
      scope: {
        model: '='
      },
      link: function($scope, $element) {
        widgetService.render($scope.model)
          .then(function(srcdoc) {
            $element.html($('<iframe/>').attr({srcdoc: srcdoc}));
          });
      }
    };

  });
