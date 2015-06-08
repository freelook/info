'use strict';
angular.module('fli.look')
    .directive('fliLookContentVkUser', function () {
        return {
            controller: 'look.content.vk.user.ctrl',
            controllerAs: 'vkUser',
            templateUrl: 'components/look/content/vk/user/user.html'
        };
    });
