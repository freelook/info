'use strict';
angular
    .module('core')
    .factory('Constants', function (VKONTAKTE, FACEBOOK, GOOGLE) {
        return {
            vk: VKONTAKTE,
            facebook: FACEBOOK,
            google: GOOGLE
        };
    });
