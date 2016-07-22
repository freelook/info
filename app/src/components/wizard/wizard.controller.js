'use strict';

angular
  .module('fli.wizard')
  .controller('wizard.ctrl',
    function ($rootScope, $routeParams, $location, $translate, $sce,
              index, locale, content, prerender) {

      $location.search({
          l: locale.init($routeParams.l)
        })
        .hash('')
        .replace();

      $translate.use(locale.getLng());
      $rootScope.fli.icon = 'magic';
      index.init();


      var vm = this;

      vm.setCode = function () {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(vm.code));
        element.setAttribute('download', 'wizard.html');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        vm.downloaded = true;
      };

      vm.setLink = function () {
        prerender.get(vm.link).then(function (res) {
          vm.html = res.data;
        });
      };

    });
