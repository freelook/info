'use strict';

angular.module('fli.widget')
  .directive('fliWidgetContent', function(widget) {

    return {
      scope: {
        model: '=',
        type: '@'
      },
      link: function($scope, $element) {
        widget.render($scope.model, $scope.type)
          .then(function(srcdoc) {
            $element.html($('<iframe/>').attr({
              id: $scope.model.wid + '-' + $scope.type,
              srcdoc: srcdoc
            }));
          });
      }
    };

  });
