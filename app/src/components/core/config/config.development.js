var CONFIG = {
  PRODUCTION: 'http://freelook.info/',
  API: {
    SOCKET: 'http://local.freelook.info:4000',
    URL: 'http://local.freelook.info/api/',
    GOOGLE: {
      KEY: 'AIzaSyApeXU8AqzpzVPhXgUQqBJS2A7u1WqCNvU'
    },
    VK: {
      ID: '4588210'
    },
    FB: {
      ID: '846841298681206',
      VERSION: 'v2.5'
    },
    FIREBASE: {
      URL: 'https://freelook.firebaseio.com/'
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


