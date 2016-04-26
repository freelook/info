'use strict';
angular
  .module('freelook.info')
  .factory('FB', function ($window, $timeout, $q, locale, CONFIG) {

    function init() {
      if ($window.FB) {
        return $q.when($window.FB);
      }
      var defer = $q.defer();
      $window.fbAsyncInit = function () {
        defer.resolve($window.FB);
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
          version: CONFIG.API.FB.VERSION
        });
      });
    }

    function promo() {
      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (!d.getElementById(id)) {
          js = d.createElement(s);
          js.id = id;
          js.src = '//connect.facebook.net/en_US/sdk/xfbml.ad.js#xfbml=1&version=v2.5&appId=846841298681206';
          fjs.parentNode.insertBefore(js, fjs);
        }
      }(document, 'script', 'facebook-jssdk'));
      xfbml();
    }

    return {
      init: init,
      xfbml: xfbml,
      promo: promo
    };

  });


