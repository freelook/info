'use strict';
angular
    .module('core')
    .factory('Services', function (VK, VKONTAKTE, FB, FACEBOOK) {
        return {
            vk: VK,
            facebook: FB
        };
    });
