'use strict';
angular
    .module('core')
    .run(
    function ($rootScope, $translate, LocalStorage, VK, Auth, Config) {

        // Init data
        $rootScope.auth = Auth;
        $rootScope.conf = Config;
        $rootScope.route = {};
        $rootScope.vk = {};
        $rootScope.google = {};

        $translate.use(LocalStorage.getLocale());
        VK.init();
        Config.init();
    });
