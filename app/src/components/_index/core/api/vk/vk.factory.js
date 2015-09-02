'use strict';
angular
  .module('freelook.info')
  .factory('vk', function ($http, api) {
    var host = 'https://api.vk.com/method/';

    function user(id) {
      var api = host + 'users.get?user_ids=' + id + '&fields=photo_200,home_town,status&callback=JSON_CALLBACK';
      return $http.jsonp(api);
    }

    function group(id) {
      var api = host + 'groups.getById?group_id=' + id + '&fields=photo_200,status&callback=JSON_CALLBACK';
      return $http.jsonp(api);
    }

    function wall(id) {
      var api = host + 'wall.get?owner_id=' + id + '&callback=JSON_CALLBACK';
      return $http.jsonp(api);
    }

    function pages(q) {
      var point = 'search?q=' + encodeURIComponent(q + '&count=24');
      return api.vk(point);
    }

    function audio(q) {
      var point = 'search?q=' + q + '&type=audio.search';
      return api.vk(point);
    }

    function share(_url, item) {
      var _item = item || {},
        _img = item.img || '',
        _title = _item.title || '',
        _description = _item.content || '';
      return 'http://vk.com/share.php?url=' + _url +
        '&image=' + _img +
        '&title=' + _title +
        '&description=' + _description;
    }

    return {
      user: user,
      wall: wall,
      group: group,
      pages: pages,
      audio: audio,
      share: share
    };

  });
