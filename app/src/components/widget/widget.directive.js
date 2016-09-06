'use strict';

angular.module('fli.widget')
  .directive('fliWidget', function() {

    return {
      templateUrl: 'components/widget/widget.html',
      controller: 'widget.ctrl',
      controllerAs: 'widgetCtrl',
      bindToController: {
        widget: '=',
        column: '=',
        edit: '=',
        options: '='
      }
    };

  });
