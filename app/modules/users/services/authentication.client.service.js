'use strict';

// Authentication service for user variables
angular
    .module('users')
    .factory('Authentication',
    function () {
        var _this = this;

        _this._data = {
            user: window.user,
            date: window.date || (new Date()).getTime()
        };

        return _this._data;
    }
);