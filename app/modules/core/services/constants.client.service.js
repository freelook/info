'use strict';
angular
    .module('core')
    .factory('Constants', function (VKONTAKTE, FACEBOOK) {
        return {
            vk: VKONTAKTE,
            facebook: FACEBOOK
        };
    });
