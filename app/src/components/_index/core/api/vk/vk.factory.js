'use strict';
angular
  .module('freelook.info')
  .factory('vk', function ($http) {
    var host = 'https://api.vk.com/method/';

    function usersGet(id) {
      var api = host + 'users.get?user_ids=' + id + '&fields=photo_200,home_town,status&callback=JSON_CALLBACK';
      return $http.jsonp(api);
    }

    function groupsGroupById(id) {
      var api = host + 'groups.getById?group_id=' + id + '&fields=photo_200,status&callback=JSON_CALLBACK';
      return $http.jsonp(api);
    }


    function wallGet(id) {
      var api = host + 'wall.get?owner_id=' + id + '&callback=JSON_CALLBACK';
      return $http.jsonp(api);
    }

    function search(q) {
      if (q) {
        var api = host + 'newsfeed.search?q=' + q + '&extended=1&count=12&callback=JSON_CALLBACK';
        return $http.jsonp(api);
      }
    }


    return {
      search: search,
      usersGet: usersGet,
      wallGet: wallGet,
      groupsGroupById: groupsGroupById
    };

  });
