'use strict';

var gulp = require('gulp');

var util = require('util');

var browserSync = require('browser-sync');

var middleware = require('./proxy');

function browserSyncInit(baseDir, files, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if(baseDir === 'src' || (util.isArray(baseDir) && baseDir.indexOf('src') !== -1)) {
    routes = {
      // Should be '/bower_components': '../bower_components'
      // Waiting for https://github.com/shakyShane/browser-sync/issues/308
      '/bower_components': 'bower_components'
    };
  }

  browserSync.instance = browserSync.init(files, {
    startPath: '/',
    server: {
      baseDir: baseDir,
      middleware: middleware,
      routes: routes
    },
    browser: browser
  });

}

gulp.task('server', ['watch'], function () {
  browserSyncInit([
    'src',
    '.tmp'
  ], [
    '.tmp/components/**/*.css',
    'src/assets/images/**/*',
    'src/*.html',
    'src/components/**/*.html',
    'src/components/**/*.js'
  ]);
});

gulp.task('server:dist', ['build'], function () {
  browserSyncInit('dist');
});

gulp.task('server:e2e', function () {
  browserSyncInit(['src', '.tmp'], null, []);
});

gulp.task('server:e2e-dist', ['watch'], function () {
  browserSyncInit('dist', null, []);
});
