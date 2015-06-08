'use strict';
angular.module('fli.look')
    .directive('fliLookContentVkGroup', function () {
        return {
            controller: 'look.content.vk.group.ctrl',
            controllerAs: 'vkGroup',
            templateUrl: 'components/look/content/vk/group/group.html'
        };
    });
