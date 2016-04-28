'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('jshint', function () {
  return gulp.src('src/components/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('partials', function () {
  return gulp.src('src/components/**/*.html')
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'freelook.info',
      root: 'components/'
    }))
    .pipe(gulp.dest('.tmp/inject/'));
});

gulp.task('html', ['jshint', 'inject', 'partials'], function () {

  var htmlFilter = $.filter('*.html'),
    jsFilter = $.filter('**/*.js'),
    cssFilter = $.filter('**/*.css'),
    indexFilter = $.filter('index.html'),
    assets;

  return gulp.src('.tmp/*.html')
    .pipe($.inject(gulp.src('.tmp/inject/templateCacheHtml.js', {read: false}), {
      starttag: '<!-- inject:partials -->',
      ignorePath: '.tmp',
      addRootSlash: false
    }))
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.if(!process.env.debug, $.ngAnnotate()))
    .pipe($.if(!process.env.debug, $.uglify()))
    .pipe(gulp.dest('dist/'))
    .pipe(gulp.dest('.tmp/'))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.if(!process.env.debug, $.csso()))
    .pipe($.if(!process.env.debug, $.stripCssComments({all: true})))
    .pipe(gulp.dest('dist/'))
    .pipe($.replace('../', ''))
    .pipe(gulp.dest('.tmp/'))
    .pipe(cssFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(gulp.dest('.tmp/'))
    .pipe(htmlFilter)
    .pipe($.minifyHtml({empty: true, spare: true, quotes: true}))
    .pipe(indexFilter)
    .pipe($.assetpaths({
      newDomain: 'http://freelook.info',
      oldDomain: '_._',
      docRoot: '/',
      filetypes: ['png', 'js', 'css', 'ico']
    }))
    .pipe(indexFilter.restore())
    .pipe(gulp.dest('dist/'))
    .pipe(htmlFilter.restore())
    .pipe($.size({title: 'Build', showFiles: true}))
});

gulp.task('images', function () {
  return gulp.src('src/assets/images/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/assets/images/'));
});

gulp.task('fonts', function () {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('misc', function () {
  return gulp.src(['src/**/*.ico', 'src/**/*.xml', 'src/.gitignore', 'src/*.json', 'src/*.js'])
    .pipe(gulp.dest('dist/'));
});

gulp.task('vendors', function () {
  return gulp.src(['src/vendors/**/*.js', 'src/vendors/**/*.html'])
    .pipe(gulp.dest('dist/vendors'));
});

gulp.task('clean', function (done) {
  $.del(['dist/', '.tmp/'], done);
});

gulp.task('pack', [], function () {
  var manifest = require('../src/manifest.json'),
    distFileName = manifest.name + '_' + manifest.version + '.zip';

  return gulp.src(['dist/**'])
    .pipe($.zip(distFileName))
    .pipe(gulp.dest('pack'));
});

gulp.task('build', ['html', 'images', 'fonts', 'misc', 'vendors']);
