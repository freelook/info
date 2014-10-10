'use strict';
angular
    .module('core')
    .run(
    function ($rootScope, Localize, VK) {

        // Init data
        $rootScope.route = {};
        $rootScope.vk = {};
        $rootScope.google = {};

        Localize.initLocalizedResources();
        VK.init();
    });
