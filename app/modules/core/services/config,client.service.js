'use strict';
angular
    .module('core')
    .factory('Config', function ($timeout, $rootScope, Constants, toaster) {

        var extensionInstalled = false;

        function init() {
            if (canUseExtension()) {
                window.chrome.runtime.sendMessage(Constants.google.EXT_ID, {msg: 'init'}, function (data) {
                    if (data) {
                        extensionInstalled = data.success;
                    }
                });
            }
        }

        function canUseExtension() {
            return !!window.chrome && !!window.chrome.app && !!window.chrome.runtime;
        }

        function isExtensionInstalled() {
            return extensionInstalled;
        }

        function ready() {
            return canUseExtension() && isExtensionInstalled();
        }

        function install(url) {

            function successCallback() {
                $timeout(function () {
                    init();
                }, 0);
            }

            function failureCallback() {
                toaster.pop('error', 'Sorry error', ':(');
            }

            return window.chrome && window.chrome.webstore.install(url, successCallback, failureCallback);
        }

        return {
            isExtensionInstalled: isExtensionInstalled,
            canUseExtension: canUseExtension,
            ready: ready,
            init: init,
            install: install
        };
    });
