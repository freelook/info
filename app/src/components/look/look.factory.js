'use strict';


angular
    .module('fli.look')
    .factory('look',function($window){
        var resources = ['youtube','facebook'];
        function define(url){
            var a = $window.document.createElement('a');
            a.href = decodeURIComponent(url);

            for(var i in resources){
               if(a.host.indexOf(resources[i])){
                   return resources[i];
               }
            }
            return false;
        }

        return {
            define:define
        };
    });
