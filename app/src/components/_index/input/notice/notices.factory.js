'use strict';
angular
  .module('freelook.info')
  .factory('notices', function () {

    var notices = [
      {
        text: 'index.input.note.chrome',
        link: 'https://chrome.google.com/webstore/detail/jlpjaecnenjbpkbcpnocbeibjokkbnhj'
      }
    ];


    return notices;

  });


