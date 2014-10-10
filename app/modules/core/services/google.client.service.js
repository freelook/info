'use strict';
angular
    .module('core')
    .factory('Google', function ($http) {
        var Google = {};

        Google.search = function(data, callBack) {
            if(data) {
                var gp = 'https://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' + data + '&callback=JSON_CALLBACK';
                $http.jsonp(gp).success(function (data) {
                    if (data && data.responseData) {
                        callBack(data.responseData);
                    }
                });
            }

        }

        return Google;

    });
