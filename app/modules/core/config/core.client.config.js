'use strict';
angular
    .module('core')
    .run(
    function ($rootScope, Localize, VK, Auth) {

        // Init data
        $rootScope.auth = Auth;
        $rootScope.route = {};
        $rootScope.vk = {};
        $rootScope.google = {};

        Localize.initLocalizedResources();
        VK.init();
    });
