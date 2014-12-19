'use strict';

module.exports = function (config) {

  config.set({
    autoWatch: false,

    frameworks: ['jasmine'],

    browsers: ['PhantomJS'],

    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-coverage'
    ],

    reporters: ['dots', 'coverage'],
    preprocessors: {
      'src/components/**/*.js': ['coverage']
    },
    coverageReporter: {
      dir: '.tmp/coverage/'
    }

  });
};
