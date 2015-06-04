'use strict';

angular
  .module('freelook.info')
  .factory('youtube',
  function ($sce, $http, $q) {

    var YAPI = {
        data: 'https://www.googleapis.com/youtube/v3/'
      },
      APP_KEY = 'AIzaSyDBAHujlSftqeYB03a0FjtwLBsQ2nA4DQM';


    // todo move to url parser
    function _extract(site) {
      var a = site || {},
        pathname = a.pathname || '';
      return pathname.split('/').splice(1);
    }

    // todo move to url parser
    function code(name, search) {
      var match = (new RegExp('[?&]' + name + '=([^&]*)')).exec(search);
      return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }

    function watch(site) {
      return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + code('v', site.search));
    }

    function videoUrl(id) {
      return encodeURIComponent('https://www.youtube.com/watch?v=' + id);
    }

    function _channel(channelId) {
      return $http.get(YAPI.data + 'search?part=snippet,id&key=' + APP_KEY + '&channelId=' + channelId);
    }

    function _user(username) {
      return $http.get(YAPI.data + 'channels?part=snippet,id&key=' + APP_KEY + '&forUsername=' + username);
    }

    //function _search(q) {
    //    return $http.get(YAPI.data + 'search?part=snippet,id&key=' + APP_KEY + '&q=' + q);
    //}

    function channel(site) {
      var id = _extract(site)[1];
      return _channel(id);
    }

    function user(site) {
      var defer = $q.defer(),
        id = _extract(site)[1];
      _user(id)
        .then(function (data) {
          if (data.data && data.data.items) {
            _channel(data.data.items[0].id)
              .then(function (data) {
                defer.resolve(data.data.items);
              });
          }
          else {
            defer.resolve([]);
          }
        });
      return defer.promise;
    }

    return {
      user: user,
      channel: channel,
      watch: watch,
      videoUrl: videoUrl
    };
  });
