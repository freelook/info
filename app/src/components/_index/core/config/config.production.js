var CONFIG = {
  PRODUCTION: 'http://freelook.info/',
  API: {
    SOCKET: 'http://freelook.info:4000',
    URL: 'http://freelook.info/api/',
    GOOGLE: {
      KEY: 'AIzaSyDBAHujlSftqeYB03a0FjtwLBsQ2nA4DQM'
    },
    PARSE: {
      ID: 'Z06a4jL9cgIguqkgMV4rMXl9xnZmPAhmIa29QERn',
      KEY: 'fzpDuSbfiiiK1tVgobdutlSozKJfW3CNgU7l6Lex'
    }
  },
  PRERENDER: {
    URL: 'http://freelook.info/prerender/',
    PRODUCTION: 'http://freelook.info/prerender/'
  },
  SITE: {
    ORIGIN: 'http://freelook.info/'
  },
  CHROME: {
    ORIGIN: '/',
    ID: 'jlpjaecnenjbpkbcpnocbeibjokkbnhj'
  },
  MOBILE: {
    ORIGIN: '/'
  },
  VK: {
    ID: '4588210'
  },
  FB: {
    ID: '846841298681206'
  }
};


angular
  .module('freelook.info')
  .constant('CONFIG', CONFIG);
