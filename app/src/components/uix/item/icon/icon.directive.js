'use strict';

angular
  .module('freelook.info')
  .directive('fliItemIcon', function () {

    var COLORS = {
      '0': '#E91E63',
      '1': '#673AB7',
      '2': '#9C27B0',
      '3': '#3F51B5',
      '4': '#2196F3',
      '5': '#00BCD4',
      '6': '#009688',
      '7': '#4CAF50',
      '8': '#FFEB3B',
      '9': '#FF9800'
    };

    return {
      link: function (scope, el, attr) {
        var letter = attr.fliItemIcon ? attr.fliItemIcon.charAt() : 'f',
          code = letter.charCodeAt().toString(),
          color = COLORS[code.charAt(code.length - 1)] || COLORS['1'];
        $(el).css({background: color}).append(letter);
      }
    };
  });
