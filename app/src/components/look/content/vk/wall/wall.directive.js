'use strict';
angular.module('fli.look')
    .directive('fliLookContentVkWall', function () {
        return {
            controller: 'look.content.vk.wall.ctrl',
            controllerAs: 'vkWall',
            templateUrl: 'components/look/content/vk/wall/wall.html'
        };
    });