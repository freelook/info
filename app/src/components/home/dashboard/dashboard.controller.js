'use strict';

angular
  .module('fli.home')
  .controller('home.dashboard.ctrl',
  function () {

    var vm = this;

    vm.model = {
      title: 'My dashboard',
      debug: true,
      structure: '50-50',
      rows: [{
        columns: [{
          flex: '50',
          widgets: [{
            type: 'linklist',
            title: 'linklist',
            config: {}
          }]
        }, {
          flex: '50',
          widgets: [{
            type: 'linklist',
            title: 'linklist',
            config: {}
          }]
        }]
      }]

    };


  });

