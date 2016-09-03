'use strict';

angular
  .module('fli.home')
  .controller('home.dashboard.ctrl',
  function () {

    var vm = this;

    vm.model = {
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

