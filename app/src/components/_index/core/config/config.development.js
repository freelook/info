var CONFIG = {
  PRODUCTION: 'http://freelook.info/',
  API: {
    SOCKET: 'http://localhost:4000',
    URL: 'http://localhost/api/',
    GOOGLE: {
      KEY: 'AIzaSyDBAHujlSftqeYB03a0FjtwLBsQ2nA4DQM'
    },
    PARSE: {
      ID: 'Z06a4jL9cgIguqkgMV4rMXl9xnZmPAhmIa29QERn',
      KEY: 'fzpDuSbfiiiK1tVgobdutlSozKJfW3CNgU7l6Lex'
    }
  },
  PRERENDER: {
    URL: 'http://localhost/prerender/',
    PRODUCTION: 'http://freelook.info/prerender/'
  },
  SITE: {
    ORIGIN: 'http://localhost/'
  },
  CHROME: {
    ORIGIN: '/',
    ID: 'hebeffpnegfapnbacgikegnfibflcghh'
  }

};


angular
  .module('freelook.info')
  .constant('CONFIG', CONFIG);


