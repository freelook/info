'use strict';
angular
  .module('freelook.info')
  .factory('share', function ($rootScope, $q, google, CONFIG) {

    var _href = '';

    function url(href) {
      if (href) {
        _href = href;
        $rootScope.fli.view = 'components/views/share/share.view.html';
      }
    }

    function run() {
      if (_href) {
        var defer = $q.defer();
        google.url.insert(_href)
          .success(function (res) {
            if (res && res.id) {
              var id = res.id.split('goo.gl/').splice(1)[0];
              return defer.resolve(CONFIG.PRODUCTION + 'page?id=' + id);
            }
            return defer.reject(res);
          })
          .error(function (err) {
            defer.reject(err);
          });

        return defer.promise;
      }
      return $q.reject();
    }

    return {
      url: url,
      run: run
    };

  });


