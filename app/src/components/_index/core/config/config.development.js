var CONFIG = {
  API: {
    URL: 'http://localhost:4000'
  },
  PRERENDER: {
    URL: 'http://localhost:4001'
  }
};


angular
  .module('freelook.info')
  .constant('CONFIG', CONFIG);


