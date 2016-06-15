'use strict';
angular
  .module('fli.core')
  .factory('user', function (userAuth, userStorage, userFeeds, userParams, USERS) {

    return {
      data: userAuth.data,
      img: userAuth.img,
      logIn: userAuth.logIn,
      logOut: userAuth.logOut,

      init: userAuth.init,
      bind: userAuth.bind,
      clear: userAuth.clear,

      model: USERS,

      feeds: userFeeds,
      storage: userStorage,
      params: userParams
    };

  });


