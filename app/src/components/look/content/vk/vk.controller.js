'use strict';

angular
    .module('fli.look')
    .controller('look.content.vk.ctrl',
    function ($scope,vk,url) {
        var vm = this,
            userId = url.extract('/:id', $scope.site.pathname).id;

        vk.usersGet(userId).then(function(data){
            console.log(data.data);
        });
        vk.groupsGroupById(userId).then(function(data){
            console.log(data.data);
        });

    });