'use strict';
angular
    .module('core')
    .run(
    function ($rootScope, Localize, VK, Authentication) {

        // Init data
        $rootScope.auth = Authentication;
        $rootScope.user = {};
        $rootScope.route = {};
        $rootScope.vk = {};
        $rootScope.google = {};

        Localize.initLocalizedResources();
        VK.init();
    });
