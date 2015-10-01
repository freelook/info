'use strict';
angular
  .module('freelook.info')
  .factory('notices', function (platform) {

    var notices = [];

    if (platform.name() === 'site') {
      notices.push({
        text: 'index.input.note.chrome',
        link: 'https://chrome.google.com/webstore/detail/jlpjaecnenjbpkbcpnocbeibjokkbnhj'
      });

    }

    return notices;

  });


