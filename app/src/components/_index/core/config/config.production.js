var CONFIG = {
  ORIGIN: 'http://freelook.info/',
  API: {
    URL: 'http://freelook.info/api/'
  },
  PRERENDER: {
    URL: 'http://freelook.info/prerender/'
  }
};


angular
  .module('freelook.info')
  .constant('CONFIG', CONFIG);
