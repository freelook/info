'use strict';

var gulp = require('gulp');

require('require-dir')('./gulp');

gulp.task('dist', ['clean'], function () {
  process.env.production = true;
  gulp.start('build');
});

gulp.task('default', ['clean'], function () {
  gulp.start('server');
});
