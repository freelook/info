'use strict';

var gulp = require('gulp');

require('require-dir')('./gulp');

gulp.task('dist', ['clean'], function () {
  process.env.production = true;
  gulp.start('build');
});

gulp.task('debug', ['clean'], function () {
  process.env.debug = true;
  gulp.start('build');
});

gulp.task('default', function () {
  gulp.start('server');
});
