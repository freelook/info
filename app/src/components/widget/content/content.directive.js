'use strict';

angular.module('fli.widget')
  .directive('fliWidgetContent', function(widget) {

    return {
      scope: {
        model: '='
      },
      link: function($scope, $element) {
        widget.render($scope.model)
          .then(function(srcdoc) {
            $element.html($('<iframe/>').attr({
              id: $scope.model.wid,
              srcdoc: srcdoc
            }));
          });
      }
    };

  });
