'use strict';
angular
  .module('freelook.info')
  .factory('notices', function ($rootScope, platform) {

    var notices = [];

    if (platform.name() === 'site') {
      notices.push({
        text: 'index.input.note.chrome',
        link: '',
        handler: function () {
          $rootScope.fli.view = 'components/_index/core/uix/apps/apps.view.html';
        }
      });

    }

    return notices;

  });


