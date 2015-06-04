'use strict';

angular
  .module('freelook.info')
  .factory('youtube',
  function ($sce, $http, $q, url) {

    var YAPI = {
        data: 'https://www.googleapis.com/youtube/v3/'
      },
      APP_KEY = 'AIzaSyDBAHujlSftqeYB03a0FjtwLBsQ2nA4DQM';

    function type(_url) {
      return url.parse(_url).pathname;
    }

    function _extract(_url) {
      var a = url.parse(_url),
        obj = {}, pathnames;
      pathnames = a.pathname.split('/').filter(function (item) {
        return item;
      });
      obj.sections = {};
      for (var i = 0; i <= pathnames.length; i = i + 2) {
        if (i % 2 === 0 && pathnames[i]) {
          obj.sections[pathnames[i]] = pathnames[i + 1];
        }
      }
      obj.search = a.search;
      return obj;
    }

    function code(name, search) {
      var match = (new RegExp('[?&]' + name + '=([^&]*)')).exec(search);
      return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }


    function watch(url) {
      var extracted = _extract(url);
      return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + code('v', extracted.search));
    }

    function videoUrl(id) {
      return $sce.trustAsResourceUrl('https://www.youtube.com/watch?v=' + id);
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

    function get(type, url) {
      var defer = $q.defer(),
        extracted = _extract(url);
      switch (type) {
        case 'user':
          _user(extracted.sections.user).then(function (data) {
            if (data.data && data.data.items) {
              _channel(data.data.items[0].id).then(function (data) {
                defer.resolve(data.data.items);
              });
            }
            else {
              defer.resolve([]);
            }
          });
          break;
        case 'channel':
          _channel(extracted.sections.user).then(function (data) {
            defer.resolve(data);
          });
          break;
        default:
          defer.resolve([]);
          break;
      }
      return defer.promise;
    }

    function user(_url) {
      return get('user', _url);
    }

    return {
      user: user,
      watch: watch,
      type: type,
      videoUrl: videoUrl
    };
  })
;
