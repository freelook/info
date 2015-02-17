var CONFIG = {
  API: {
    URL: 'http://freelook.herokuapp.com'
  },
  PRERENDER: {
    URL: 'http://freelookinfo.herokuapp.com'
  }
};


angular
  .module('freelook.info')
  .constant('CONFIG', CONFIG);
