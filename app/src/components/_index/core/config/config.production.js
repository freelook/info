var CONFIG = {
  PRODUCTION: 'http://freelook.info/',
  API: {
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
    URL: 'http://freelook.info/prerender/'
  },
  SITE: {
    ORIGIN: 'http://freelook.info/'
  },
  CHROME: {
    ORIGIN: '/',
    ID: 'xxxxx'
  }

};


angular
  .module('freelook.info')
  .constant('CONFIG', CONFIG);
