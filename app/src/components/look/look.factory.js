'use strict';

angular
  .module('fli.look')
  .factory('look', function ($routeParams, item, user) {

    function add(_item) {
      if (_item && _item.url && _item.img) {
        var _data = angular.copy(_item);
        _data.img = $routeParams.img || _data.img;
        user.feeds.addItem('looks', item.extend(_data));
      }
    }

    return {
      add: add
    };

  });
