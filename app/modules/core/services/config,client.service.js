'use strict';
angular
    .module('core')
    .factory('Config', function (Constants) {

        function ready() {
        return window.chrome && window.chrome.app && window.chrome.app.isInstalled;
        }

        return {
            ready: ready
        };
    });
