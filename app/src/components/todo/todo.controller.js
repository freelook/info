'use strict';

angular
  .module('fli.todo')
  .controller('todo.ctrl',
  function ($rootScope, $routeParams, $mdMedia, $translate, $timeout, I18N, todo) {

    var vm = this;

    $rootScope.fli.route = $routeParams || {};
    $rootScope.fli.media = $mdMedia;
    $rootScope.fli.title = 'FLI - todo list';
    $rootScope.fli.description = $translate.instant(I18N.DEFAULT_DESCRIPTION);

    function init(todos) {
      $timeout(function () {
        vm.todos = !!todo ? todos : [];
        vm.text = '';
      });
    }

    function get() {
      todo.get().then(init);
    }

    vm.add = function () {
      var _todo = {
        text: vm.text || ''
      };
      todo.add(_todo).then(get);
    };

    vm.del = function (_todo) {
      todo.del(_todo).then(get);
    };

    init();
    get();

  });
