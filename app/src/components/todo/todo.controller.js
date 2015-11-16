'use strict';

angular
  .module('fli.todo')
  .controller('todo.ctrl',
  function ($rootScope, $routeParams, $mdMedia, $translate, $timeout, I18N, TODO) {

    var vm = this;

    $rootScope.fli.route = $routeParams || {};
    $rootScope.fli.media = $mdMedia;
    $rootScope.fli.title = 'FLI - todo list';
    $rootScope.fli.description = $translate.instant(I18N.DEFAULT_DESCRIPTION);

    function init(todos) {
      $timeout(function () {
        vm.todos = !!todos ? todos : [];
        vm.text = '';
      });
    }

    function get() {
      TODO.get().then(init);
    }

    vm.add = function () {
      var _todo = {
        text: vm.text || ''
      };
      TODO.add(_todo).then(get);
    };

    vm.del = function (_todo) {
      TODO.del(_todo).then(get);
    };

    init();
    get();

  });
