'use strict';

angular.module('fli.widget')
  .directive('fliWidget', function() {

    return {
      replace: true,
      templateUrl: 'components/widget/widget.html',
      controller: 'widget.ctrl',
      controllerAs: 'widgetCtrl',
      bindToController: {
        widget: '=',
        column: '=',
        options: '='
      }
    };

  });
