'use strict';
angular
    .module('core')
    .factory('Services', function (VK, FB) {
        return {
            vk: VK,
            facebook: FB
        };
    });
