'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

gulp.task('inject', function () {

  var injectStyles = gulp.src([
    'src/components/**/*.css'
  ], {read: false});

  var js = [
    'src/components/**/*.js',
    '!src/components/**/*.spec.js',
    '!src/components/**/*.mock.js'
  ];

  if (!process.env.production) {
    js.push('!src/components/**/*.production.js');
  } else {
    js.push('!src/components/**/*.development.js');
  }

  var injectScripts = gulp.src(js, {read: false});

  var injectOptions = {
    ignorePath: ['src', '.tmp'],
    addRootSlash: false
  };

  var wiredepOptions = {
    directory: 'src/bower_components'
  };

  gulp.src('src/index.html')
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(wiredepOptions))
    .pipe(gulp.dest('.tmp/'));

  gulp.src('src/app.html')
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(wiredepOptions))
    .pipe(gulp.dest('src/'))
    .pipe(gulp.dest('.tmp/'));

});
