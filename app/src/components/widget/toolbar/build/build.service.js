'use strict';

angular
  .module('fli.widget')
  .service('widgetBuildService', function($mdDialog) {

    function dialog() {
      $mdDialog.show({
        templateUrl: 'components/widget/toolbar/build/build.html',
        controller: 'widget.toolbar.build.ctrl',
        controllerAs: 'buildCtrl',
        bindToController: true,
        clickOutsideToClose: true,
        fullscreen: true
      });
    }

    function cancel() {
      $mdDialog.cancel();
    }

    function save() {}

    return {
      dialog: dialog,
      cancel: cancel,
      save: save
    };
  });
