'use strict';

var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  middleware = require('./middleware');


function browserSyncInit(baseDir, files, browser) {
  var fls = files || [];
  browser = browser === undefined ? 'default' : browser;

  if (!process.env.production) {
    fls.push('!src/components/**/*.production.js');
  } else {
    fls.push('!src/components/**/*.development.js');
  }

  browserSync.instance = browserSync.init(fls, {
    startPath: '/',
    port: 8080,
    open: false,
    server: {
      baseDir: baseDir,
      middleware: middleware
    },
    browser: browser
  });

}

gulp.task('server', ['watch'], function () {
  browserSyncInit([
    '.tmp',
    'src'
  ], [
    '.tmp/components/**/*.css',
    'src/assets/images/**/*',
    '.tmp/*.html',
    'src/components/**/*.html',
    'src/components/**/*.js'
  ]);
});

gulp.task('server:dist', function () {
  browserSyncInit('dist');
});

gulp.task('server:e2e', function () {
  browserSyncInit(['.tmp', 'src'], null, []);
});

gulp.task('server:e2e-dist', function () {
  browserSyncInit('dist', null, []);
});
