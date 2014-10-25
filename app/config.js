'use strict';

// Init the application configuration module for AngularJS application
var app = (function () {
    // Init module configuration options
    var name = 'app';
    var vendors = [
        'ngResource',
        'ngCookies',
        'ngAnimate',
        'ngRoute',
        'ngTouch',
        'ngSanitize',
        'pascalprecht.translate',
        'mobile-angular-ui',
        'toaster'
    ];

    // Add a new vertical module
    var registerModule = function (moduleName, dependencies) {
        // Create angular module
        angular.module(moduleName, dependencies || []);

        // Add the module to the AngularJS configuration file
        addModule(moduleName);
    };

    var addModule = function(moduleName){
        angular.module(name).requires.push(moduleName);
    };

    return {
        name: name,
        vendors: vendors,
        registerModule: registerModule,
        addModule: addModule
    };
})();