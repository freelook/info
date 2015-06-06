'use strict';
angular.module('fli.look')
    .directive('fliLookContentVk', function () {
        return {
            controller: 'look.content.vk.ctrl',
            templateUrl: 'components/look/content/vk/vk.html'
        };

    });