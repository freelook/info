'use strict';

angular
  .module('fli.look')
  .controller('look.content.facebook.user.ctrl',
  function ($routeParams, $q, $scope, api, url, facebook) {

    var vm = this;

    vm.img = facebook.img;

    function _getId(_url) {
      var _id = url.extract('*/app_scoped_user_id/:id(/)', _url).id;
      if (_id) {
        return $q.when(_id);
      }

      var defer = $q.defer();
      api.proxy(_url)
        .success(function (html) {
          var _html = html || '',
            match = _html.match(/profile_id=(.+?)&/i) || [],
            id = match[1] || '';
          return defer.resolve(id);
        })
        .error(function (err) {
          return defer.reject(err);
        });

      return defer.promise;
    }

    _getId($routeParams.url)
      .then(function (_id) {
        $scope.fb.id = _id;
        return facebook.user(_id);
      })
      .then(function (_usr) {
        vm.data = _usr.data || {};
      });

  });
