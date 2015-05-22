'use strict';

var gulp = require('gulp');

gulp.task('watch', ['inject'], function () {
  gulp.watch(['src/components/**/*.css',
    'src/components/**/*.js',
    'src/assets/images/**/*',
    'bower.json'
  ], ['inject', 'jshint']);
});
