'use strict';

angular
    .module('fli.look')
    .factory('youtube',
    function ($sce, $http) {
        var YAPI = {
                data: "https://www.googleapis.com/youtube/v3/"
            },
            APP_KEY = 'AIzaSyB0wq4qIQKeHX3aTScWgbA-BTRwp40NUIM',
            _types = ['watch', 'channel', 'user'];

        function _extract(url) {
            var parts = /http(?:s)?:\/\/(?:www)?.youtube.com\/(.*)\?(.*)/i.exec(url),
                obj = {};

            if (parts && parts[1]) {
                obj.params = parts[1].split("/");
            }
            if (parts && parts[2]) {
                obj.search = parts[2];
            }
            return obj;
        }

        function define(url) {
            var extracted = _extract(url);
            if (extracted.params && extracted.params.length) {
                for (var i in _types) {
                    if (extracted.params.indexOf(_types[i]) !== -1) {
                        return _types[i];
                    }
                }
            }
            return false;

        }

        function code(name, search) {
            var match = (new RegExp('[?&]' + name + '=([^&]*)')).exec(search);
            return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
        }

        function playlist() {
            return $http.get(YAPI.data + 'search?part=snippet,id&key=' + APP_KEY + '&channelId=' + channelId);

        }

        function video(url) {
            var extracted = _extract(url);
            return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + code('v', extracted.search));
        }

        function channel(channelId) {
            return $http.get(YAPI.data + 'search?part=snippet,id&key=' + APP_KEY + '&channelId=' + channelId);
        }

        function search(q) {
            return $http.get(YAPI.data + 'search?part=snippet,id&key=' + APP_KEY + '&q=' + q);
        }

        function get(type){
            return [];
        }
        
        return {
            define: define,
            get:get,
            video:video
        }
    })
;
