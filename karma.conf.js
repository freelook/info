'use strict';

/**
 * Module dependencies.
 */
var applicationConfiguration = require('./config/config');

// Karma configuration
module.exports = function (config) {
    config.set({
        // Frameworks to use
        frameworks: ['jasmine'],

        // List of files / patterns to load in the browser
        files: [
            // lib
            'app/lib/angular/angular.js',
            'app/lib/angular-route/angular-route.js',
            'app/lib/angular-touch/angular-touch.js',
            'app/lib/angular-resource/angular-resource.js',
            'app/lib/angular-cookies/angular-cookies.js',
            'app/lib/angular-animate/angular-animate.js',
            'app/lib/angular-sanitize/angular-sanitize.js',
            'app/lib/mobile-angular-ui/dist/js/mobile-angular-ui.js',
            'app/lib/angularjs-toaster/toaster.js',

            // js
            'app/config.js',
            'app/application.js',
            'app/modules/*/*.js',
            'app/modules/*/*[!tests]*/*.js',

            // test
            'app/lib/angular-mocks/angular-mocks.js',
            'app/modules/*/tests/*.js'
        ],

        // Test results reporter to use
        // Possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        //reporters: ['progress'],
        reporters: ['progress', 'coverage'],
        preprocessors: { 'app/modules/**/*.js': ['coverage']},
        coverageReporter: {
            dir: 'app/generated/coverage/'
        },

        // Web server port
        port: 9876,

        // Enable / disable colors in the output (reporters and logs)
        colors: true,

        // Level of logging
        // Possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // Enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // If true, it capture browsers, run tests and exit
        singleRun: true
    });
};