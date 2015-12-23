'use strict';
angular
  .module('freelook.info')
  .filter('duration', function () {
    return function (value, format) {
      var s = format === 'sec' ? value : Math.floor(value / 1000),
        h = 3600,
        m = 60,
        hours = Math.floor(s / h),
        minutes = Math.floor((s % h) / m),
        seconds = Math.floor((s % m));
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      if (hours < 10) {
        hours = '0' + hours;
      }
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      return hours + ':' + minutes + ':' + seconds;
    };
  });
