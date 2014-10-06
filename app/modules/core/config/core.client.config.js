'use strict';
angular
    .module('core')
    .run(
    function (Localize, VK) {
        Localize.initLocalizedResources();
        VK.init();
    });
