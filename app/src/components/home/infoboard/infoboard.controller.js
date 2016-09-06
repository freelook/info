'use strict';

angular
  .module('fli.home')
  .controller('home.infoboard.ctrl',
  function () {

    var ctrl = this;

    ctrl.model = {
      title: 'My infoboard',
      columns: [{
        flex: '40',
        widgets: [{
          name: 'linklist',
          title: 'Linklist',
          config: {}
        }]
      }, {
        flex: '60',
        widgets: [{
          name: 'linklist',
          title: 'Linklist',
          config: {}
        }]
      }]

    };

  });

