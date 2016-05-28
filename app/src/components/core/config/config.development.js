var CONFIG = {
  PRODUCTION: 'http://freelook.info/',
  VERSION: '1.15.7',
  API: {
    SOCKET: 'http://local.freelook.info:4000',
    URL: 'http://local.freelook.info/api/',
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
    URL: 'http://local.freelook.info/prerender/',
    PRODUCTION: 'http://freelook.info/prerender/'
  },
  SITE: {
    ORIGIN: 'http://local.freelook.info/'
  },
  CHROME: {
    ORIGIN: '/',
    ID: 'hebeffpnegfapnbacgikegnfibflcghh'
  },
  MOBILE: {
    ORIGIN: '/'
  }
};


angular
  .module('freelook.info')
  .constant('CONFIG', CONFIG);


