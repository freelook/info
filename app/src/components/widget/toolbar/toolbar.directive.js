'use strict';

angular
  .module('fli.board')
  .directive('fliWidgetToolbar', function() {
    return {
      templateUrl: 'components/widget/toolbar/toolbar.html',
      controller: 'widget.toolbar.ctrl',
      controllerAs: 'toolbarCtrl',
      bindToController: {
        model: '=',
        column: '=',
        options: '='
      }
    };
  });
