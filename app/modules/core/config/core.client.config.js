'use strict';
angular
    .module('core')
    .run(
    function ($rootScope, $translate, LocalStorage, VK, Auth) {

        // Init data
        $rootScope.auth = Auth;
        $rootScope.route = {};
        $rootScope.vk = {};
        $rootScope.google = {};

        $translate.use(LocalStorage.getLocale());
        VK.init();
    });
