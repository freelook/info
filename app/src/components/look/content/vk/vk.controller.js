'use strict';

angular
    .module('fli.look')
    .controller('look.content.vk.ctrl',
    function ($scope, vk, url) {
        var params = url.extract('/:id', $scope.site.pathname);
        if (params && params.id) {

            vk.usersGet(params.id).then(function (data) {
                if (!data.error && data.data && data.data.response) {
                    $scope.user = data.data.response[0];
                    $scope.ownerId = $scope.user.uid;
                }
                else {
                    vk.groupsGroupById(params.id).then(function (data) {
                        if (!data.error && data.data && data.data.response) {
                            $scope.group = data.data.response[0];
                            $scope.ownerId = $scope.group.gid;
                        }
                    });
                }
            });

        }

    });