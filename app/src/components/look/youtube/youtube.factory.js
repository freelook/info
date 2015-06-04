'use strict';

angular
    .module('fli.look')
    .factory('youtube',
    function ($sce, $http, $q,CONFIG) {
        var YAPI = {
                data: "https://www.googleapis.com/youtube/v3/"
            },
            APP_KEY = 'AIzaSyB0wq4qIQKeHX3aTScWgbA-BTRwp40NUIM',
            _types = ['watch', 'channel', 'user'];

        function _extract(url) {
            var a = document.createElement('a'),
                obj = {}, pathnames;
            a.href = url;
            pathnames = a.pathname.split('/').filter(function(item){
                return item;
            });
            obj.sections = {};
            for (var i = 0; i <= pathnames.length; i = i + 2) {
                if (i % 2 == 0 && pathnames[i]) {
                    obj.sections[pathnames[i]] = pathnames[i + 1];
                }
            }
            obj.search = a.search;
            return obj;
        }

        function define(url) {
            var extracted = _extract(url);
            if (extracted.sections) {
                for (var i in _types) {
                    if (Object.keys(extracted.sections).indexOf(_types[i]) !== -1) {
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

        function videoEmbed(url) {
            var extracted = _extract(url);
            return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + code('v', extracted.search));
        }

        function videoUrl(id) {
            return $sce.trustAsResourceUrl('https://www.youtube.com/watch?v=' + id);
        }

        function _channel(channelId) {
            return $http.get(YAPI.data + 'search?part=snippet,id&key=' + APP_KEY + '&channelId=' + channelId);
        }
        function _user(username){
            return $http.get(YAPI.data + 'channels?part=snippet,id&key=' + APP_KEY + '&forUsername=' + username);
        }

        function search(q) {
            return $http.get(YAPI.data + 'search?part=snippet,id&key=' + APP_KEY + '&q=' + q);
        }

        function get(type,url) {
            var defer = $q.defer(),
                extracted = _extract(url);
            switch (type) {
                case 'user':
                    _user(extracted.sections['user']).then(function(data){
                        if(data.data && data.data.items){
                            _channel(data.data.items[0]['id']).then(function(data){
                                defer.resolve(data.data.items);
                            });
                        }
                        else {
                            defer.resolve([]);
                        }
                    });
                    break;
                case 'channel':
                    _channel(extracted.sections['user']).then(function(data){
                        defer.resolve(data);
                    });
                    break;
                default:
                    defer.resolve([]);
                    break;
            }
            return defer.promise;
        }

        return {
            define: define,
            get: get,
            videoEmbed: videoEmbed,
            videoUrl:videoUrl
        }
    })
;
