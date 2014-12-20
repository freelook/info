'use strict';

var gulp = require('gulp');

gulp.task('watch', ['wiredep', 'injector:css', 'injector:js'] ,function () {
  gulp.watch('src/components/**/*.css', ['injector:css']);
  gulp.watch('src/components/**/*.js', ['injector:js']);
  gulp.watch('src/assets/images/**/*', ['images']);
  gulp.watch('bower.json', ['wiredep']);
});
