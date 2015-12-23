'use strict';

angular
  .module('freelook.info')
  .factory('youtube',
  function ($sce, $http, $q, url, CONFIG, YAPI) {

    var APP_KEY = CONFIG.API.GOOGLE.KEY;

    function _point(point) {
      return $http.get(YAPI.data + point + '&key=' + APP_KEY);
    }

    function _searchByChannelId(channelId) {
      return _point('search?part=snippet&maxResults=12&channelId=' + channelId);
    }

    function _user(username) {
      return _point('channels?part=id&&forUsername=' + username);
    }

    function search(q) {
      return _point('search?part=snippet&maxResults=12&q=' + q);
    }

    function user(id) {
      var defer = $q.defer();
      _user(id)
        .then(function (user) {
          if (user.data && user.data.items) {
            _searchByChannelId(user.data.items[0].id)
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

    function watch(site) {
      return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + url.qByName('v', site.search));
    }

    function watchUrl(id) {
      return encodeURIComponent('https://www.youtube.com/watch?v=' + id);
    }

    function channel(id) {
      return _searchByChannelId(id);
    }

    return {
      user: user,
      search: search,
      channel: channel,
      watch: watch,
      watchUrl: watchUrl
    };
  })
  .constant('YAPI', {
    data: 'https://www.googleapis.com/youtube/v3/'
  });
