'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
    nodeInspector = require('gulp-node-inspector'),
    mocha = require('gulp-mocha'),
    jsFiles = ['gulpFile.js', 'server.js', 'config/**/*.js', 'controllers/**/*.js',
        'models/**/*.js', 'routes/**/*.js', 'test/**/*.js', 'sockets/**/*.js', 'services/**/*.js'];

gulp.task('jshint', function () {
    gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('nodemon', function (done) {
    //'--debug-brk' -- break on first line
    nodemon({script: 'server.js', nodeArgs: ['--debug'], env: {'NODE_ENV': 'development'}})
        .on('restart');
});

gulp.task('mochaTest', function () {
    process.env.NODE_ENV = 'development';
    gulp.src(['server.js', 'tests/**/*.js'])
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('watch', function () {
    var server = livereload();

    gulp.watch(jsFiles, ['jshint']).on('change', function (file) {
        server.changed(file.path);
    });
});

gulp.task('inspector', function () {
    gulp.src(['server.js'])
        .pipe(nodeInspector({
            debugBrk: false,
            debugPort: 5858,
            webHost: 'localhost',
            webPort: 3333,
            saveLiveEdit: true,
            preload: false,
            hidden: [],
            stackTraceLimit: 50,
            sslKey: '',
            sslCert: ''
        }));
});

// Default task(s).
gulp.task('default', ['jshint', 'nodemon', 'watch']);
gulp.task('debug', ['inspector', 'jshint', 'nodemon', 'watch']);

// Lint task(s).
gulp.task('lint', ['jshint']);

// Test task.
gulp.task('test', ['mochaTest']);