'use strict';
angular
  .module('freelook.info')
  .factory('Firebase', function ($window, $firebaseAuth, CONFIG) {

    function ref(path) {
      return new $window.Firebase(CONFIG.API.FIREBASE.URL + path);
    }

    function authObj() {
      return $firebaseAuth(ref());
    }

    return {
      ref: ref,
      authObj: authObj
    };

  });


