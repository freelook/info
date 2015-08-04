var CONFIG = {
  ORIGIN: 'http://freelook.info/',
  PRODUCTION: 'http://freelook.info/',
  API: {
    URL: 'http://freelook.info/api/',
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
