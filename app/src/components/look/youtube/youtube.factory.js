'use strict';

angular
    .module('fli.look')
    .factory('youtube',
    function ($sce,$http) {
        var YAPI = {
            data:"https://www.googleapis.com/youtube/v3/"
        },
            APP_KEY='AIzaSyB0wq4qIQKeHX3aTScWgbA-BTRwp40NUIM';

        function watch(){

        }

        function playlist(){
            return $http.get(YAPI.data+'search?part=snippet,id&key='+APP_KEY+'&channelId='+channelId);

        }

        function channel(channelId){
            return $http.get(YAPI.data+'search?part=snippet,id&key='+APP_KEY+'&channelId='+channelId);
        }

        function search(q){
            return $http.get(YAPI.data+'search?part=snippet,id&key='+APP_KEY+'&q='+q);
        }



        return {
            search:search
        }
    })
;
