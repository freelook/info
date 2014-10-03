'use strict';
angular
    .module('core')
    .run(
    function (Localize) {
        Localize.initLocalizedResources();
    });
