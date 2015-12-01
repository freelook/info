'use strict';
angular
  .module('freelook.info')
  .factory('FB', function ($window, $timeout, $q, locale, Parse, CONFIG) {

    function init() {

      if ($window.FB) {
        return $q.when($window.FB);
      }

      var defer = $q.defer();

      $window.fbAsyncInit = function () {
        Parse.FacebookUtils.init({
          appId: CONFIG.API.FB.ID,
          version: CONFIG.API.FB.VERSION
        });
        return defer.resolve($window.FB);
      };

      $timeout(function () {
        var js, id = 'facebook-jssdk', d = document, s = 'script',
          fjs = d.getElementsByTagName(s)[0];
        if (!d.getElementById(id)) {
          js = d.createElement(s);
          js.id = id;
          js.src = 'vendors/fb/' + locale.getLng() + '/sdk.js';
          fjs.parentNode.insertBefore(js, fjs);
        }
      }, 0);

      return defer.promise;
    }

    function xfbml() {
      init().then(function (fb) {
        fb.init({
          xfbml: true,
          version: CONFIG.FB.VERSION
        });
      });
    }

    return {
      init: init,
      xfbml: xfbml
    };

  });


