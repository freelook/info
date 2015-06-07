'use strict';

angular
    .module('fli.look')
    .controller('look.content.vk.wall.ctrl',
    function ($scope,vk) {
        $scope.$watch('ownerId',function(ownerId){
            if(ownerId){
                vk.wallGet(ownerId).then(function(data){
                    if(data && !data.error && data.data && data.data.response){
                        $scope.results = data.data.response;
                    }
                });
            }
        });

    });

