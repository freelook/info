'use strict';
angular
  .module('freelook.info')
  .factory('vk', function ($http, $window, $timeout, api, VK_API) {

    function _enpoint(_end) {
      return VK_API.ENDPOINT + _end;
    }

    function _point(_end) {
      return $http.jsonp(_enpoint(_end));
    }

    function init() {
      $timeout(function () {
        var e = 'script', el = document.createElement(e),
          s = document.getElementsByTagName(e)[0];
        el.src = 'vendors/vk/openapi.js';
        el.async = true;
        s.parentNode.insertBefore(el, s);
      }, 0);
    }

    function user(id) {
      return _point('users.get?user_ids=' + id + '&fields=photo_200,home_town,status&callback=JSON_CALLBACK');
    }

    function group(id) {
      return _point('groups.getById?group_id=' + id + '&fields=photo_200,status&callback=JSON_CALLBACK');
    }

    function wall(id) {
      return _point('wall.get?owner_id=' + id + '&callback=JSON_CALLBACK');
    }

    function actions(q) {
      return _point('newsfeed.search?q=' + q + '&extended=1&callback=JSON_CALLBACK');
    }

    function pages(q) {
      var point = encodeURIComponent('groups.search?q=' + q + '&count=24');
      return api.vk(point);
    }

    function people(q) {
      var point = encodeURIComponent('users.search?q=' + q + '&count=24&fields=photo_200,domain,status,about');
      return api.vk(point);
    }

    function audio(q) {
      var point = encodeURIComponent('audio.search?q=' + q);
      return api.vk(point);
    }

    function share(_url, item) {
      var _item = item || {},
        _img = item.img || '',
        _title = _item.titleNoFormatting || _item.title || '',
        _description = _item.contentNoFormatting || _item.content || '';
      return 'http://vk.com/share.php?url=' + _url +
        '&image=' + _img +
        '&title=' + _title +
        '&description=' + _description +
        '&noparse=true';
    }

    function login() {
      return 'https://oauth.vk.com/authorize?client_id=4588210&scope=audio,video&redirect_uri=http://freelook.info/token&display=popup&response_type=token';
    }

    function link(_id) {
      var id = _id || '';
      return 'https://vk.com/' + id;
    }

    return {
      init: init,
      user: user,
      wall: wall,
      actions: actions,
      group: group,
      pages: pages,
      people: people,
      audio: audio,
      share: share,
      login: login,
      link: link
    };

  })
  .constant('VK_API', {
    ENDPOINT: 'https://api.vk.com/method/'
  });

