'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('injector:css', ['wiredep'], function () {
  return gulp.src('src/index.html')
    .pipe($.inject(gulp.src([
      'src/components/**/*.css'
    ], {read: false}), {
      ignorePath: 'src',
      addRootSlash: false
    }))
    .pipe(gulp.dest('src/'));
});

gulp.task('jshint', function () {
  return gulp.src('src/components/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('injector:js', ['jshint', 'injector:css'], function () {

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

  return gulp.src('src/index.html')
    .pipe($.inject(gulp.src(js, {read: false}), {
      ignorePath: 'src',
      addRootSlash: false
    }))
    .pipe(gulp.dest('src/'));
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

gulp.task('html', ['wiredep', 'injector:css', 'injector:js', 'partials'], function () {

  var htmlFilter = $.filter('*.html'),
    jsFilter = $.filter('**/*.js'),
    cssFilter = $.filter('**/*.css'),
    assets;

  return gulp.src('src/*.html')
    .pipe($.inject(gulp.src('.tmp/inject/templateCacheHtml.js', {read: false}), {
      starttag: '<!-- inject:partials -->',
      ignorePath: '.tmp',
      addRootSlash: false
    }))
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify({preserveComments: $.uglifySaveLicense}))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.if(!!process.env.production, $.assetpaths({
      newDomain: 'http://vps.freelook.info',
      oldDomain: 'no_value',
      docRoot: '/',
      filetypes: ['css']
    })))
    .pipe(htmlFilter.restore())
    .pipe(gulp.dest('dist/'))
    .pipe($.size({title: 'dist/', showFiles: true}));
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
  return gulp.src('src/**/*.ico')
    .pipe(gulp.dest('dist/'));
});

gulp.task('clean', function (done) {
  $.del(['dist/', '.tmp/'], done);
});

gulp.task('build', ['html', 'images', 'fonts', 'misc']);
