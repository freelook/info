var CONFIG = {
  ORIGIN: 'http://vps.freelook.info/',
  API: {
    URL: 'http://vps.freelook.info/api/'
  },
  PRERENDER: {
    URL: 'http://vps.freelook.info/prerender/'
  }
};


angular
  .module('freelook.info')
  .constant('CONFIG', CONFIG);
