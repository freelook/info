'use strict';

var gulp = require('gulp'),
  util = require('util'),
  browserSync = require('browser-sync'),
  middleware = require('./middleware');


function browserSyncInit(baseDir, files, browser) {
  var fl = files || [];
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if(baseDir === 'src' || (util.isArray(baseDir) && baseDir.indexOf('src') !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  if (!process.env.production) {
    fl.push('!src/components/**/*.production.js');
  } else {
    fl.push('!src/components/**/*.development.js');
  }

  browserSync.instance = browserSync.init(files, {
    startPath: '/',
    port: 8080,
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
