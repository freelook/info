'use strict';
angular
    .module('core')
    .filter('unixtime', function () {
        return function (unixtime) {
            return new Date(unixtime);
        };
    });
