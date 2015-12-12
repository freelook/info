'use strict';
angular
  .module('freelook.info')
  .factory('share', function ($rootScope, $q, google, CONFIG) {

    var _href = '';

    function url(href) {
      _href = href;
      $rootScope.fli.view = 'components/_index/core/uix/share/share.view.html';
    }

    function run() {
      var defer = $q.defer();
      google.url.insert(_href)
        .success(function (res) {
          if (res && res.id) {
            var id = res.id.split('goo.gl/').splice(1)[0];
            return defer.resolve(CONFIG.PRODUCTION + 'page?id=' + id);
          }
          return defer.reject(res);
        });

      return defer.promise;
    }

    return {
      url: url,
      run: run
    };

  });


