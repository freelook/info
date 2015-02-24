'use strict';
angular.module('fli.look')
  .directive('fliLookShort', function ($rootScope, prerender) {
    return {
      scope: true,
      templateUrl: 'components/look/short/short.html',
      link: function (scope) {

        scope.shortData = {};

        function shortHTML(html, by) {
          var dom = (new window.DOMParser()).parseFromString(html, 'text/html');
          var short = [];

          $('*:contains(' + $rootScope.fli.route[by] + ')', $('body', dom))
            .each(function (i, e) {

              var element = $(e);

              if (!element.children().length) {
                short.push({html: element.parent().text()});
              }

            });

          return !!short.length ? short : '';
        }


        if ($rootScope.fli.route.url) {
          prerender.get($rootScope.fli.route.url).then(function (html) {
            scope.shortData = shortHTML(html, 'context') || shortHTML(html, 'input') || [];
          });
        }

      }
    };

  });
