'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
    mocha = require('gulp-mocha'),
    jsFiles = ['gulpFile.js', 'server.js', 'config/**/*.js', 'controllers/**/*.js',
        'models/**/*.js', 'routes/**/*.js', 'test/**/*.js', 'sockets/**/*.js'];

gulp.task('jshint', function() {
  gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('nodemon', function (done) {
  nodemon({ script: 'server.js', env: { 'NODE_ENV': 'development' }})
    .on('restart');
});

gulp.task('mochaTest', function () {
    process.env.NODE_ENV = 'test';
    gulp.src(['server.js','app/tests/**/*.js'])
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('watch', function() {
  var server = livereload();

  gulp.watch(jsFiles).on('change', function(file) {
      server.changed(file.path);
  });
});

// Default task(s).
gulp.task('default', ['jshint','nodemon', 'watch']);

// Lint task(s).
gulp.task('lint', ['jshint']);

// Test task.
gulp.task('test', [ 'mochaTest']);