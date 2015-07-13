'use strict';

var gulp = require('gulp');

require('require-dir')('./gulp');

gulp.task('dist', ['clean'], function () {
  process.env.production = true;
  gulp.start('build');
});

gulp.task('mobile', ['clean', 'mobile-clean'], function () {
  gulp.start('mobile-dist');
});

gulp.task('default', function () {
  gulp.start('server');
});
