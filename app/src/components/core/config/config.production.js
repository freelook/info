var CONFIG = {
  PRODUCTION: 'http://freelook.info/',
  VERSION: '1.14.1',
  API: {
    SOCKET: 'http://freelook.info:4000',
    URL: 'http://freelook.info/api/',
    GOOGLE: {
      ID: '76317551711-dmmn2t0c6up8blo2qhg0i4ekv53drvji.apps.googleusercontent.com',
      KEY: 'AIzaSyApeXU8AqzpzVPhXgUQqBJS2A7u1WqCNvU'
    },
    VK: {
      ID: '4588210'
    },
    FB: {
      ID: '846841298681206',
      VERSION: 'v2.5'
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
  }
};


angular
  .module('freelook.info')
  .constant('CONFIG', CONFIG);
