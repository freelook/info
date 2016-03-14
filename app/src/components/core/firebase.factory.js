'use strict';
angular
  .module('freelook.info')
  .factory('Firebase', function ($window, loaderInterceptor, CONFIG) {

    function ref(path) {
      return new $window.Firebase([CONFIG.API.FIREBASE.URL, path || ''].join(''));
    }

    function loader(promise) {
      loaderInterceptor.toggleLoader(true);
      return promise
        .then(function (data) {
          loaderInterceptor.toggleLoader(false);
          return data;
        })
        .catch(function (err) {
          loaderInterceptor.toggleLoader(false);
          return err;
        });
    }

    return {
      ref: ref,
      loader: loader
    };

  });


