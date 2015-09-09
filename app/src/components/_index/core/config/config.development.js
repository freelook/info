var CONFIG = {
  ORIGIN: '/',
  PRODUCTION: 'http://freelook.info/',
  API: {
    URL: 'http://localhost/api/',
    GOOGLE: {
      KEY: 'AIzaSyDBAHujlSftqeYB03a0FjtwLBsQ2nA4DQM'
    }
  },
  PRERENDER: {
    URL: 'http://freelook.info/prerender/'
  }
};


angular
  .module('freelook.info')
  .constant('CONFIG', CONFIG);


