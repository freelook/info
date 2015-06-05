'use strict';

angular
  .module('freelook.info')
  .factory('youtube',
  function ($sce, $http, $q, url) {

    var YAPI = {
        data: 'https://www.googleapis.com/youtube/v3/'
      },
      APP_KEY = 'AIzaSyDBAHujlSftqeYB03a0FjtwLBsQ2nA4DQM';


    function _search(channelId) {
      return $http.get(YAPI.data + 'search?part=snippet&maxResults=12&key=' + APP_KEY + '&channelId=' + channelId);
    }

    function _user(username) {
      return $http.get(YAPI.data + 'channels?part=id&key=' + APP_KEY + '&forUsername=' + username);
    }

    function watch(site) {
      return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + url.qByName('v', site.search));
    }

    function watchUrl(id) {
      return encodeURIComponent('https://www.youtube.com/watch?v=' + id);
    }

    function user(id) {
      var defer = $q.defer();
      _user(id)
        .then(function (user) {
          if (user.data && user.data.items) {
            _search(user.data.items[0].id)
              .then(function (channel) {
                defer.resolve(channel.data.items);
              });
          }
          else {
            defer.reject(user);
          }
        });
      return defer.promise;
    }

    return {
      user: user,
      watch: watch,
      watchUrl: watchUrl
    };
  });
