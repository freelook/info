'use strict';

angular
  .module('fli.home')
  .controller('home.infoboard.ctrl',
  function () {

    var ctrl = this;

    ctrl.model = {
      title: 'My infoboard',
      columns: [{
        flex: '25',
        widgets: [{
          type: 'linklist',
          title: 'linklist',
          config: {}
        }]
      }, {
        flex: '75',
        widgets: [{
          type: 'linklist',
          title: 'linklist',
          config: {}
        }]
      }]

    };

  });

